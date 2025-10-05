import { Heading, VStack } from '@chakra-ui/react';
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable';
import { IContactSupport } from '../../types/pages/contactSupport/contactSupport.types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { getAllContactDetails } from '../../features/contactSupport/contactSupportAction';
import moment from 'moment';

export default function ContactSupport() {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector((state) => state?.contact?.contactDetails);
  const searchQuery = useAppSelector((state) => state?.utils?.searchQuery);

  const [filteredContacts, setFilteredContacts] = useState<
    IContactSupport[] | null
  >(contacts);

  const columns = [
    {
      name: 'Name',
      selector: (row: IContactSupport) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: IContactSupport) => row.email,
      sortable: true,
    },
    {
      name: 'Mobile',
      selector: (row: IContactSupport) => `+${row.mobile}`,
      sortable: true,
    },
    {
      name: 'Submitted Date',
      selector: (row: IContactSupport) =>
        moment(row.updatedOn).format('DD-MM-yyyy'),
      sortable: true,
    },
    {
      name: 'message',
      selector: (row: IContactSupport) => row.message,
      sortable: true,
    },
  ];

  useEffect(() => {
    dispatch(getAllContactDetails());
  }, []);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const filteredData = contacts?.filter(
        (item) =>
          item?.name?.includes(searchQuery) ||
          item?.email?.includes(searchQuery) ||
          item?.message?.includes(searchQuery) ||
          item.mobile?.includes(searchQuery)
      );
      setFilteredContacts(filteredData || null);
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchQuery, contacts]);

  return (
    <VStack alignItems='flex-start'>
      <Heading variant='sectionHeading'>Contact Support</Heading>
      <CustomDataTable
        columns={columns}
        data={filteredContacts || []}
        selectableRows={false}
      />
    </VStack>
  );
}
