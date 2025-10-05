import {
  Flex,
  Heading,
  IconButton,
  Image,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import AddButton from '../../components/Buttons/AddButton/AddButton';
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import FormModal from '../../components/Modal/FormModal/FormModal';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import AlertDialogRemoval from '../../components/AlertDialog/AlertDialogRemoval';
import JobForm from '../../components/Forms/JobForm/JobForm';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  deleteJobs,
  fetchFindJobs,
} from '../../features/findJobs/findJobsAction';
import useCustomToast from '../../hooks/useCustomToast/useCustomToast';
import { resetStatus } from '../../features/findJobs/findJobsSlice';

export default function FindAJob() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const findJob: any = useAppSelector((state) => state?.findJob?.findJob);
  const success = useAppSelector((state) => state.findJob.success);
  const error = useAppSelector((state) => state.findJob.error);
  const message = useAppSelector((state) => state.findJob.message);
  const toast = useCustomToast();
  const [showAlert, setShowAlert] = useState(false);
  const [delId, setDelId] = useState<string>('');

  useEffect(() => {
    console.log(error, success);
    if (error) {
      toast('Error', message || 'error');
    } else if (success) {
      toast('Success', message || 'success');
    }
    dispatch(resetStatus());
    dispatch(fetchFindJobs());
  }, [success, error]);

  const columns = [
    {
      name: 'Image',
      cell: (row: any) => {
        return (
          <Image
            w='80px'
            h='80px'
            src={`https://api.pickmymaid.com/${row?.image}`}
          />
        );
      },
    },
    {
      name: 'Name',
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: 'Service',
      selector: (row: any) => row.service,
      sortable: true,
    },
    {
      name: 'Nationality',
      selector: (row: any) => row.nationality,
      sortable: true,
    },
    {
      name: 'Location',
      selector: (row: any) => row.location,
      sortable: true,
    },
    {
      name: 'Commitment',
      selector: (row: any) => row.commitment,
      sortable: true,
    },
    {
      name: 'Delete',
      cell: (cell: any) => {
        return (
          <IconButton
            colorScheme='red'
            aria-label='delete-button'
            icon={<RiDeleteBin5Fill />}
            onClick={() => {
              setShowAlert(true);
              setDelId(cell?._id);
            }}
          />
        );
      },
    },
  ];

  const handleDeletion = () => {
    dispatch(deleteJobs({ id: delId }));
    setShowAlert(false);
    setDelId('');
  };

  useEffect(() => {
    dispatch(fetchFindJobs());
  }, []);

  return (
    <VStack alignItems='flex-start'>
      <FormModal isOpen={isOpen} onClose={onClose} title='Add Member'>
        <JobForm onClose={onClose} />
      </FormModal>
      <AlertDialogRemoval
        title='Are you Sure ?'
        isOpen={showAlert}
        body='Do you want to delete the Job application?'
        onClose={() => setShowAlert(false)}
        onProceed={handleDeletion}
      />

      <Heading variant='sectionHeading'>Find A Job</Heading>
      <VStack w='100%'>
        <Flex justifyContent='flex-end' w='100%'>
          <AddButton onClick={onOpen}>New Job</AddButton>
        </Flex>
        <CustomDataTable
          columns={columns}
          data={findJob?.jobs}
          selectableRows={false}
        />
      </VStack>
    </VStack>
  );
}
