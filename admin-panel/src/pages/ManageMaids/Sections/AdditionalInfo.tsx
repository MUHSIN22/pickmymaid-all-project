import { Box, Button, Center, Flex, Grid, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import EditorField from '../../../components/InputFields/EditorField/EditorField';
import { useForm } from 'react-hook-form';
import File from '../../../assets/Images/Manage-maid/Rectangle 1.png';
import { IoAdd, IoCloseCircleOutline } from 'react-icons/io5';
import { getAddBody } from '../utils/getBody';
import {
  submitMaidData,
  updateMaidData,
} from '../../../features/manageMaids/ManageMaidActions';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import useCustomToast from '../../../hooks/useCustomToast/useCustomToast';
import { resetSuccess } from '../../../features/manageMaids/ManageMaidSlice';

const AdditionalInfo = ({ tabIndex, data }: any) => {
  const { handleSubmit, reset, control } = useForm();
  const [files, setFiles] = useState<
    { type: string; name: string; file: string }[]
  >([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const toast = useCustomToast();
  // const onchanges = watch();
  const message = useAppSelector((state) => state.maids.message);
  const error = useAppSelector((state) => state.maids.error);
  const success = useAppSelector((state) => state.maids.success);

  const personalData = localStorage.getItem('personalData');
  const contactDetails = localStorage.getItem('contactData');
  // data submit
  const onsubmit = (notes: any) => {
    let data = { ...notes, files };
    localStorage.setItem('additionalInfo', JSON.stringify(data));
    const id = searchParams.get('id');
    let body: FormData = getAddBody(notes, files);
    if (id) {
      body.append('id', id);
      dispatch(updateMaidData({ body }));
    } else {
      if (personalData && contactDetails) {
        dispatch(submitMaidData({ body }));
      } else {
        if (!personalData) {
          toast('Error', 'Please save the PersonalData', 'error');
        } else {
          toast('Error', 'Please save the contactDetails', 'error');
        }
      }
    }
  };
  const removeItemLocalstorage = () => {
    localStorage.removeItem('personalData');
    localStorage.removeItem('otherDetails');
    localStorage.removeItem('contactData');
    localStorage.removeItem('employmentHistory');
    localStorage.removeItem('additionalInfo');
  };
  useEffect(() => {
    if (Object.keys(data)?.length > 0) {
      data = data?.jobApplication;
      reset({
        notes: data?.notes,
      });
    }
  }, [data]);

  const addDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const fileData = event.target.result as string;
          setFiles([
            ...files,
            {
              file: fileData,
              name: e.target.files ? e.target.files[0].name : 'unknown',
              type: e.target.files ? e.target.files[0].type : '',
            },
          ]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeFromFiles = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };
  useEffect(() => {
    if (error) {
      toast('Error', message?.toString(), 'error');
    }
  }, [error, message]);

  useEffect(() => {
    if (success) {
      toast('success', message?.toString(), 'success');
      dispatch(resetSuccess());
      removeItemLocalstorage();
      navigate('/approved-maid');
    }
  }, [success, message]);

  return (
    <Grid>
      <form onSubmit={handleSubmit(onsubmit)}>
        <EditorField
          name='notes'
          control={control}
          label='Notes'
          rules={{ required: false, minLength: 5 }}
        />
        <Grid mt={5} gap='20px'>
          <Box>
            <Text fontWeight={'600'}>Add Documents</Text>
            <Flex mt={3} gap={5}>
              {files.map((item, i) => (
                <Box pos='relative' maxW='100px' h='180px' key={i}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '0px',
                      left: '0px',
                    }}
                    onClick={() => removeFromFiles(i)}
                  >
                    <IoCloseCircleOutline
                      style={{ width: '20px', height: '20px' }}
                    />
                  </div>
                  <Image h='100px' src={File} />
                  <Text mt={2}>
                    {item?.name.length > 10
                      ? `${item?.name.slice(0, 15)}...`
                      : item?.name}
                  </Text>
                </Box>
              ))}
              <Box position='relative'>
                <Image h='100px' src={File} />
                <Center
                  position='absolute'
                  left='0'
                  width='100%'
                  h='120px'
                  top='0'
                  cursor='pointer'
                >
                  <IoAdd style={{ width: '30px', height: '30px' }} />
                </Center>
                <input
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                  }}
                  onChange={(e) => addDocument(e)}
                  type='file'
                />
              </Box>
            </Flex>
          </Box>
          <Flex w='100%' justifyContent='space-between '>
            <Button
              onClick={() => tabIndex((prev: number) => prev - 1)}
              bg='brand.primary.900'
              color='white'
            >
              Previous
            </Button>
            <Button type='submit' bg='brand.primary.900' color='white'>
              Submit
            </Button>
          </Flex>
        </Grid>
      </form>
    </Grid>
  );
};

export default AdditionalInfo;
