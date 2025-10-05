import { Box, Heading } from '@chakra-ui/layout';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { fetchMaidData } from '../../features/manageMaids/ManageMaidActions';
import { useNavigate } from 'react-router-dom';

interface DataRow {
  title: string;
  director: string;
  year: string;
  name: string;
}
const columns: TableColumn<DataRow>[] = [
  {
    name: 'Name',
    selector: (row: any) => row.name,
  },
  {
    name: 'Phone',
    selector: (row: any) => row?.mobile,
  },
  {
    name: 'Email',
    selector: (row: any) => row?.email,
  },
];
const JobApplications = () => {
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const dispatch = useAppDispatch();
  const jobData: any = useAppSelector((state) => state?.maids?.maids);
  console.log(data);
  useEffect(() => {
    dispatch(fetchMaidData());
  }, []);
  useEffect(() => {
    setData(jobData?.jobApplication);
  }, [jobData]);
  const handleRowClicked = (row: any) => {
    navigation(`/manage-maids?id=${row._id}`);
  };
  return (
    <Box>
      <DataTable
        title={<Heading size='md'>Job Applications</Heading>}
        highlightOnHover
        pagination
        onRowClicked={handleRowClicked}
        responsive
        columns={columns}
        data={data}
      />
    </Box>
  );
};

export default JobApplications;
