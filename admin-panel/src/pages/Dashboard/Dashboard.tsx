import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getCategoryAnalytics } from '../../features/dashboard/dashboardAction';
import { useAppSelector } from '../../hooks/useAppSelector';
import { categoryAnalyticsPieOptions } from './dashboard.data';
import EChartsReact from 'echarts-for-react';
import { ICategoryAnalytics } from '../../types/features/dashboard.type';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import PrimaryInput from '../../components/InputFields/PrimaryInput/PrimaryInput';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const [filterDate, setFilterDate] = useState({});
  const [categoryOptions, setCategoryOptions] = useState<any>(
    categoryAnalyticsPieOptions
  );

  const { status, categoryAnalytics } = useAppSelector(
    (state) => state.dashboard
  );

  const dateFilter = (data: any) => {
    setFilterDate(data);
  };

  useEffect(() => {
    dispatch(getCategoryAnalytics(filterDate));
  }, [filterDate]);

  useEffect(() => {
    if (categoryAnalytics.length > 0 && categoryAnalyticsPieOptions) {
      const data: { name: string; value: number }[] = categoryAnalytics.map(
        (item: ICategoryAnalytics) => ({
          value: item.count,
          name: item.category,
        })
      );
      setCategoryOptions((prev: any) => ({
        ...prev,
        series: [
          {
            name: 'Category Analytics',
            type: 'pie',
            radius: '80%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }));
    }
  }, [categoryAnalytics]);

  console.log({ categoryAnalytics, categoryOptions, status });

  return (
    <VStack w='100%'>
      <HStack alignItems='flex-end' justify='flex-end' w='100%'>
        <Box w='max-content'>
          <PrimaryInput
            type='date'
            label='From'
            errorMessage=''
            register={register('from')}
          />
        </Box>
        <Box w='max-content'>
          <PrimaryInput
            type='date'
            label='To'
            errorMessage=''
            register={register('to')}
          />
        </Box>
        <Button
          variant='primary'
          fontSize='0.9rem'
          onClick={handleSubmit(dateFilter)}
        >
          Submit
        </Button>
      </HStack>
      <Grid gridTemplateColumns='repeat(3,1fr)' w='100%'>
        <GridItem>
          <DashboardCard title='Categories Analytics'>
            {categoryAnalytics?.length === 0 ? (
              <Text>No Data found</Text>
            ) : (
              <EChartsReact
                option={categoryOptions}
                style={{ width: '100%' }}
              />
            )}
          </DashboardCard>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Dashboard;
