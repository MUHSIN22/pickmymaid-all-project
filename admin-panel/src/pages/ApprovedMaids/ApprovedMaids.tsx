import DataTable, { TableColumn } from 'react-data-table-component';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteJobApplications,
  fetchApprovedMaids,
  updateReferences,
} from '../../features/approvedMaids/AprovedMaidsAction';
import {
  Box,
  Flex,
  HStack,
  Heading,
  IconButton,
  Select,
  Switch,
} from '@chakra-ui/react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import AlertDialogRemoval from '../../components/AlertDialog/AlertDialogRemoval';
import useCustomToast from '../../hooks/useCustomToast/useCustomToast';
import { MdHistory } from 'react-icons/md';
import HistoryDrawer from '../../components/HistoryDrawer/HistoryDrawer';

interface DataRow {
  title: string;
  director: string;
  year: string;
  name: string;
  _id: string;
  availability: boolean;
  references: boolean;
  status: number; // Assuming the 'status' property is of type number
}

const ApproovedMaids = () => {
  const navigation = useNavigate();
  const [data, setData] = useState<any[]>([]); // Update the type of 'data'
  const [totalRows, setTotalRows] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const success = useAppSelector((state) => state.approvedMaids.success);
  const error = useAppSelector((state) => state.approvedMaids.error);
  const message = useAppSelector((state) => state.approvedMaids.message);
  const loading = useAppSelector((state) => state.approvedMaids.loading);
  const searchField = useAppSelector((state) => state?.utils?.searchQuery);
  const jobData: any = useAppSelector((state) => state?.approvedMaids?.maids);
  const toast = useCustomToast();
  const [filter, setFilter] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [delId, setDelId] = useState<string>('');
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Serial No',
      selector: (row: any) => row.ref_number,
    },
    {
      name: 'Name',
      selector: (row: any) => row.name,
    },
    {
      name: 'Phone',
      selector: (row: any) => row.uae_no,
    },
    {
      name: 'Email',
      selector: (row: any) => row.email,
    },
    {
      name: 'Reference',
      cell: (row: DataRow) => (
        <Switch
          isChecked={row.references}
          onChange={(e) => handleToggle(e, row, 'reference')}
        />
      ),
    },
    {
      name: 'Approved',
      cell: (row: DataRow) => (
        <Switch
          isChecked={[2, 1]?.includes(row.status)}
          onChange={(e) => handleToggle(e, row, 'approve')}
        />
      ),
    },
    {
      name: 'Hired',
      cell: (row: DataRow) => (
        <Switch
          isChecked={!row.availability}
          onChange={(e) => handleToggle(e, row, 'hire')}
        />
      ),
    },
    {
      name: 'Actions',
      cell: (row: DataRow) => (
        <HStack>
          <IconButton
            colorScheme='red'
            aria-label='delete-button'
            icon={<RiDeleteBin5Fill />}
            onClick={() => {
              setShowAlert(true);
              setDelId(row?._id);
            }}
          />
          <IconButton
            colorScheme='blue'
            aria-label='maid-history'
            icon={<MdHistory />}
            onClick={() => {
              setHistoryId(row?._id);
            }}
          />
        </HStack>
      ),
    },
  ];

  // useEffect(() => {
  //   if (searchField?.length > 0) {
  //     const searchedData = jobData?.jobApplication?.filter(
  //       (item: any) =>
  //         item?.name?.includes(searchField) ||
  //         item?.email?.includes(searchField) ||
  //         item?.uae_no?.replace(/ /g, '').includes(searchField) ||
  //         item.ref_number?.includes(searchField)
  //     );
  //     setData(searchedData);
  //   } else {
  //     setData(jobData?.jobApplication || []);
  //   }
  // }, [searchField]);

  const handleDeletion = () => {
    dispatch(deleteJobApplications({ id: delId }));
    setShowAlert(false);
  };
  const handleToggle = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: DataRow,
    type: string
  ) => {
    // Update the 'status' property of the row
    let status = e.target.checked ? '1' : '0';
    const updatedData = data.map((d) => {
      if (d === row) {
        switch (type) {
          case 'reference':
            return { ...d, references: d.references ? false : true };
          case 'approve':
            return { ...d, status: d?.status === 3 ? 1 : 3 };
          case 'hire':
            return { ...d, availability: d?.availability ? false : true };
        }
      }
      return d;
    });
    let body = { id: row._id, status };
    switch (type) {
      case 'reference':
        dispatch(updateReferences({ body, url: 'assured' }));
        break;
      case 'approve':
        body = { id: row._id, status: status === '1' ? '0' : '1' };
        dispatch(updateReferences({ body, url: 'disabled' }));
        break;
      case 'hire':
        body = { id: row._id, status: status === '1' ? '0' : '1' };
        dispatch(updateReferences({ body, url: 'hire' }));
        break;
      default:
        return null;
    }
    setData(updatedData);
  };

  const handleChangePage = async (page: number) => {
    setCurrentPage(page);
    setApiLoading(true);
    await dispatch(fetchApprovedMaids({ page, limit: perPage, filter })); // no -1 here
    setApiLoading(false);
  };

  const handleRowsPerPage = async (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    setApiLoading(true);
    await dispatch(fetchApprovedMaids({ page, limit: newPerPage, filter })); // no -1 here
    setApiLoading(false);
  };

  const handleFilter = async (filter: any) => {
    setApiLoading(true);
    await dispatch(
      fetchApprovedMaids({
        page: currentPage,
        limit: perPage,
        search: searchField,
        filter: filter,
      })
    );
    setApiLoading(false);
  };

  useEffect(() => {
    const callForMaids = async () => {
      setApiLoading(true);
      await dispatch(
        fetchApprovedMaids({
          page: currentPage,
          limit: perPage,
          search: searchField,
          filter,
        })
      );
      setApiLoading(false);
    };
    callForMaids();
  }, [currentPage, perPage, searchField]);

  useEffect(() => {
    setData(jobData?.jobApplication || []);
    setTotalRows(jobData?.count || 0);
  }, [jobData]);

  const handleRowClicked = (row: DataRow) => {
    navigation(`/manage-maids?id=${row?._id}`);
  };
  /* This `useEffect` hook is responsible for handling the side effects related to the deletion of a job
application. Here's a breakdown of what it does: */
  useEffect(() => {
    if (delId) {
      if (error) {
        toast('Error', message || 'error');
      } else if (success) {
        toast('Success', message || 'success');
      }
      dispatch(
        fetchApprovedMaids({ page: currentPage, limit: perPage, filter })
      );
      setDelId('');
    }
  }, [success, error]);

  useEffect(() => {
    handleFilter(filter);
  }, [filter]);
  return (
    <Box>
      <HistoryDrawer
        isOpen={Boolean(historyId)}
        onClose={() => setHistoryId(null)}
        maidId={historyId as string}
      />
      <AlertDialogRemoval
        title='Are you Sure ?'
        isOpen={showAlert}
        body='Do you want to delete the Job application?'
        onClose={() => setShowAlert(false)}
        onProceed={handleDeletion}
      />
      {/* {loading || apiLoading ? (
        <Box width={'100%'} height={'100%'}>
          <Center>Loading....</Center>
        </Box>
      ) : ( */}
      <DataTable
        title={
          <Flex justifyContent='space-between'>
            <Heading size='md' flex={1}>
              Approved Maids
            </Heading>
            <Select
              flex={1}
              maxW='10rem'
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value='none'>Select</option>
              <option value='hired'>Hired</option>
              <option value='unhired'>Un-hired</option>
              <option value='approved'>Approved</option>
              <option value='unapproved'>Non-approved</option>
            </Select>
          </Flex>
        }
        highlightOnHover
        pagination
        onRowClicked={handleRowClicked}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleRowsPerPage}
        responsive
        paginationServer
        columns={columns}
        data={data}
        paginationTotalRows={totalRows}
        progressPending={apiLoading || loading}
      />
      {/* )} */}
    </Box>
  );
};

export default ApproovedMaids;
