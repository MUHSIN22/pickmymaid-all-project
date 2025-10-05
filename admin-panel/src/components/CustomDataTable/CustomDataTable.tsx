import { Box } from '@chakra-ui/react';
import DataTable, { TableProps } from 'react-data-table-component';

export default function CustomDataTable<T>(props: TableProps<T>): JSX.Element {
  return (
    <Box p={4} border='2px solid' borderColor='soft.gray' w='100%' rounded='xl'> 
      <DataTable
        fixedHeader
        highlightOnHover
        pagination
        selectableRows
        {...props}
      />
    </Box>
  );
}
