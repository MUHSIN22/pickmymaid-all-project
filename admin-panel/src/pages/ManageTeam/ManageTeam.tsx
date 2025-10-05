import {
  Flex,
  Heading,
  IconButton,
  Switch,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import AddButton from '../../components/Buttons/AddButton/AddButton';
import CustomDataTable from '../../components/CustomDataTable/CustomDataTable';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  deleteTeamMember,
  getAllTeamMembers,
  updateRole,
} from '../../features/manageTeam/manageTeamAction';
import { ITeamMember } from '../../types/features/manageTeam.types';
import FormModal from '../../components/Modal/FormModal/FormModal';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import AlertDialogRemoval from '../../components/AlertDialog/AlertDialogRemoval';

export default function ManageTeam() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const alertDisclosure = useDisclosure();
  const dispatch = useAppDispatch();

  const [alertBody, setAlertBody] = useState<string>('');
  const [functionSelector, setFunctionSelector] = useState<{
    type: string;
    id: string;
  } | null>(null);

  const teamList = useAppSelector((state) => state.team.teamList);
  const status = useAppSelector((state) => state?.team?.status);

  const searchField = useAppSelector((state) => state?.utils?.searchQuery);

  const [filteredTeamList, setFilteredTeamList] = useState<
    ITeamMember[] | null
  >(teamList);

  const columns = [
    {
      name: 'Name',
      selector: (row: ITeamMember) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: ITeamMember) => row.email,
      sortable: true,
    },
    {
      name: 'Super Admin',
      cell: (cell: ITeamMember) => (
        <Switch
          isChecked={cell.role === 'Super Admin'}
          onChange={() => handleRoleChange(cell.userID)}
        />
      ),
    },
    {
      name: 'Delete',
      cell: (cell: ITeamMember) => {
        return (
          <IconButton
            colorScheme='red'
            aria-label='delete-button'
            icon={<RiDeleteBin5Fill />}
            onClick={() => handleDeletion(cell.userID)}
          />
        );
      },
    },
  ];

  const handleDeletion = (id: string) => {
    setAlertBody('Are you sure you want to delete this team member?');
    alertDisclosure.onOpen();
    setFunctionSelector({
      type: 'delete',
      id,
    });
  };

  const handleRoleChange = (id: string) => {
    setAlertBody('Are you sure you want to change role of this team member?');
    alertDisclosure.onOpen();
    setFunctionSelector({
      type: 'role',
      id,
    });
  };

  const onAlertProceed = () => {
    if (functionSelector) {
      if (functionSelector.type === 'delete') {
        dispatch(deleteTeamMember({ id: functionSelector.id }));
      } else if (functionSelector.type === 'role') {
        dispatch(updateRole({ id: functionSelector.id }));
      }
      alertDisclosure.onClose();
    }
  };

  useEffect(() => {
    if (!teamList) {
      dispatch(getAllTeamMembers());
    }
  }, []);

  useEffect(() => {
    if (status === 'success') {
      alertDisclosure.onClose();
    }
  }, [status]);

  useEffect(() => {
    if (searchField?.length > 0) {
      let filteredData = filteredTeamList?.filter(
        (item) =>
          item?.name.includes(searchField) || item?.email?.includes(searchField)
      );
      setFilteredTeamList(filteredData || null);
    } else {
      setFilteredTeamList(teamList);
    }
  }, [searchField, teamList]);

  return (
    <VStack alignItems='flex-start'>
      <FormModal isOpen={isOpen} onClose={onClose} title='Add Member'>
        <RegisterForm onClose={onClose} />
      </FormModal>

      <AlertDialogRemoval
        title='Are you sure?'
        body={alertBody}
        isOpen={alertDisclosure.isOpen}
        onClose={alertDisclosure.onClose}
        onProceed={onAlertProceed}
      />

      <Heading variant='sectionHeading'>Manage Team</Heading>
      <VStack w='100%'>
        <Flex justifyContent='flex-end' w='100%'>
          <AddButton onClick={onOpen}>New Member</AddButton>
        </Flex>
        <CustomDataTable
          columns={columns}
          data={filteredTeamList || []}
          selectableRows={false}
        />
      </VStack>
    </VStack>
  );
}
