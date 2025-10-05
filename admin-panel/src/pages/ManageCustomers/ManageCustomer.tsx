import { Heading, IconButton, VStack, useDisclosure } from '@chakra-ui/react';
import { ICustomerReturn } from '../../types/features/manageCustomer.types';
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  getAllCustomers,
  toggleCustomerBlock,
  updateCustomerPassword,
} from '../../features/manageCustomers/manageCustomersAction';
import { RiLockPasswordFill } from 'react-icons/ri';
import useCustomToast from '../../hooks/useCustomToast/useCustomToast';
import { resetCustomerState } from '../../features/manageCustomers/manageCustomerSlice';
import AlertDialogRemoval from '../../components/AlertDialog/AlertDialogRemoval';
import moment from 'moment';
import { MdBlock } from 'react-icons/md';

export default function ManageCustomer() {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const banDisclosure = useDisclosure();

  const [clicked, setClicked] = useState<string | null>(null);

  const customersList = useAppSelector((state) => state?.customers?.customers);
  const status = useAppSelector((state) => state?.customers?.status);
  const message = useAppSelector((state) => state?.customers?.message);
  const searchQuery = useAppSelector((state) => state?.utils?.searchQuery);

  const [filteredCustomers, setFilteredCustomers] = useState<
    ICustomerReturn[] | null
  >(customersList);

  const columns = [
    {
      name: 'Name',
      selector: (row: ICustomerReturn) => row.fullName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: ICustomerReturn) => row.email,
      sortable: true,
    },
    {
      name: 'Mobile',
      selector: (row: ICustomerReturn) => `+${row.mobile}`,
      sortable: true,
    },
    {
      name: 'Created at',
      selector: (row: ICustomerReturn) =>
        moment(row.createdAt).format('DD-MM-yyyy'),
      sortable: true,
    },
    {
      name: 'Update Password',
      cell: (cell: ICustomerReturn) => {
        return (
          <IconButton
            colorScheme='orange'
            aria-label='password-update'
            isLoading={status === 'loading' && clicked === cell.userID}
            icon={<RiLockPasswordFill />}
            onClick={() => {
              setClicked(cell.userID);
              onOpen();
            }}
          />
        );
      },
    },
    {
      name: 'Block User',
      cell: (cell: ICustomerReturn) => {
        return (
          <IconButton
            colorScheme='red'
            aria-label='toggle-block'
            isLoading={status === 'loading' && clicked === cell.userID}
            icon={<MdBlock />}
            onClick={() => {
              setClicked(cell.userID);
              banDisclosure.onOpen();
            }}
          />
        );
      },
    },
  ];

  const onAlertProceed = async () => {
    await dispatch(
      updateCustomerPassword({ body: { user_id: clicked || '' } })
    );
    onClose();
  };

  const onBanProceed = async () => {
    await dispatch(toggleCustomerBlock({ body: { user_id: clicked || '' } }));
    banDisclosure.onClose();
  };

  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

  useMemo(() => {
    if (status !== 'idle' && message) {
      if (status === 'success') {
        toast('Success', message);
      } else if (status === 'error') {
        toast('Error', message, 'error');
      }
      dispatch(resetCustomerState());
    }
  }, [status, message]);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const filteredData = customersList?.filter(
        (item) =>
          item?.fullName?.includes(searchQuery) ||
          item?.userID?.includes(searchQuery) ||
          item?.email?.includes(searchQuery) ||
          item?.mobile?.includes(searchQuery)
      );
      setFilteredCustomers(filteredData || null);
    } else {
      setFilteredCustomers(customersList);
    }
  }, [searchQuery, customersList]);

  return (
    <VStack alignItems='flex-start'>
      <AlertDialogRemoval
        title='Are you sure?'
        body='Are you sure to change the password of this customer?'
        isOpen={isOpen}
        onClose={onClose}
        onProceed={onAlertProceed}
      />
      <AlertDialogRemoval
        title='Are you sure?'
        body='Are you sure to change the ban status of this customer?'
        isOpen={banDisclosure.isOpen}
        onClose={banDisclosure.onClose}
        onProceed={onBanProceed}
      />
      <Heading variant='sectionHeading'>Manage Customers</Heading>
      <CustomDataTable
        columns={columns}
        data={filteredCustomers || []}
        selectableRows={false}
      />
    </VStack>
  );
}
