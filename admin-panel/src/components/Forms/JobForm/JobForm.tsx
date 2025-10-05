import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PrimaryInput from '../../InputFields/PrimaryInput/PrimaryInput';
// import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { findAJob } from '../../../pages/FindAJob/data/FindJob.data';
import DropDown from '../../InputFields/dropdown/DropDown';
import {
  createFindJobs,
} from '../../../features/findJobs/findJobsAction';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

export default function JobForm({ onClose }: { onClose: any }) {
  const [img, setImg] = useState('');
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({ mode: 'onChange' });
  
  const onFormSubmission = async (data: any) => {
    if (!img) {
      return;
    }
    let formData = new FormData();
    formData.append('commitment', data?.commitment);
    formData.append('location', data?.location);
    formData.append('nationality', data?.nationality);
    formData.append('service', data?.service);
    formData.append('title', data?.title);
    formData.append('image', img);
    dispatch(createFindJobs({ formData }));
    setImg('');
    onClose();
  };

  const onImageHandler = (e: any) => {
    let img = e.target.files[0];
    setImg(img);
  };
  return (
    <VStack pb={{ base: 6 }}>
      <Grid gridTemplateColumns='1fr 1fr' gap='20px'>
        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input onChange={onImageHandler} type='file' />
        </FormControl>
        {findAJob?.map((item, i) => {
          return (
            <Box key={i}>
              {item.field == 'input' ? (
                <PrimaryInput
                  {...item}
                  register={register(item.key, {
                    required: item.required ? item.errorMessage : false,
                  })}
                  required
                  errorMessage={errors[`${item.key}`]?.message?.toString()}
                />
              ) : (
                <DropDown
                  {...item}
                  defaultValue={`Select ${item.label}`}
                  register={register(item.key, {
                    required: item.required ? item.errorMessage : false,
                  })}
                  errorMessage={errors[`${item.key}`]?.message?.toString()}
                />
              )}
            </Box>
          );
        })}
      </Grid>
      <Flex justifyContent='end' w='100%'>
        <Button variant='primary' onClick={handleSubmit(onFormSubmission)}>
          Submit
        </Button>
      </Flex>
    </VStack>
  );
}
