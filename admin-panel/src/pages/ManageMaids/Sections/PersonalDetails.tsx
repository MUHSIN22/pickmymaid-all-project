import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Image as ChakraImage,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
// import img from '../../../assets/Images/Manage-maid/Image.png';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { PersonalInputs } from '../data/Personal.data';
import PrimaryInput from '../../../components/InputFields/PrimaryInput/PrimaryInput';
import DropDown from '../../../components/InputFields/dropdown/DropDown';
import { MdOutlineSkipNext } from 'react-icons/md';
import { imageUrl } from '../../../app/config/imageUrl';
import AddButton from '../../../components/Buttons/AddButton/AddButton';
// @ts-ignore
import watermark from 'watermarkjs';

const PersonalDetails = ({ tabIndex, data }: any) => {
  const [img, setImg] = useState('');
  const [formData, setFormData] = useState<any>();
  const [onReset, setOnReset] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const toast = useToast();
  const storedData = localStorage.getItem('personalData');

  // for adding default values
  useEffect(() => {
    if (storedData && Object.keys(data).length === 0) {
      reset(JSON.parse(storedData));
      setImg(JSON.parse(storedData).img);
      setFormData(JSON.parse(storedData).imgName);
    } else if (Object.keys(data)?.length > 0) {
      data = data?.jobApplication;
      let resetData: any = {
        name: data?.name,
        age: data?.age,
        maritalStatus: data?.marital_status,
        nationality: data?.nationality,
        location: data?.location,
        date: data?.date?.split('T')[0],
        religion: data?.religion,
        service: data?.service,
        salary: data?.is_negotiable_salary
          ? 'negotiable'
          : `${data?.salary?.from}-${data?.salary?.to}`,
        education: data?.education,
        email: data?.email,
        dayOff: data?.day_of,
        value: data?.value,
      };
      setImg(`${imageUrl}${data?.profile}`);
      reset(resetData);
    } else {
      reset({
        name: null,
        age: null,
        maritalStatus: null,
        nationality: null,
        location: null,
        date: null,
        religion: null,
        service: null,
        salary: null,
        education: null,
        email: null,
        dayOff: null,
        value: null,
      });
      setImg(``);
    }
  }, [data, localStorage.getItem('personalData'), onReset]);

  // handling image here changing to base64 now
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgLoading(true);
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imgSrc = event.target?.result;

          const canvas: any = document.createElement('canvas');
          const context = canvas.getContext('2d');

          const img = new Image();
          img.src = imgSrc as string;

          img.onload = function () {
            // Set canvas dimensions to match the user-uploaded image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the user-uploaded image on the canvas
            context?.drawImage(img, 0, 0);

            // Load the watermark image
            const watermarkImg = new Image();
            watermarkImg.src = '/logo/logo white.png'; // Replace with your watermark image URL

            watermarkImg.onload = function () {
              // Set the size for the watermark image (adjust width and height as needed)
              const watermarkWidth = canvas.width * 0.5; // 50% of canvas width
              const watermarkHeight =
                (watermarkWidth / watermarkImg.width) * watermarkImg.height;

              // Set the opacity for the watermark image
              context.globalAlpha = 0.5; // Adjust the opacity as needed

              // Draw the resized watermark image on top of the user-uploaded image
              context?.drawImage(
                watermarkImg,
                canvas.width / 2 - watermarkWidth / 2, // Adjust the position as needed
                canvas.height / 2 - watermarkHeight / 2, // Adjust the position as needed
                watermarkWidth,
                watermarkHeight
              );

              // Reset globalAlpha for subsequent drawings
              context.globalAlpha = 1;

              // Convert canvas content to base64 data URL
              const watermarkedImgSrc = canvas.toDataURL(file.type);

              // Set state and update UI
              setImg(watermarkedImgSrc);
              setFormData({ name: file.name, type: file.type });
              setImgLoading(false);
            };
          };
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onsubmit = (data: any) => {
    if (!img) {
      toast({
        title: 'Please add your Profile',
        status: 'error',
        position: 'bottom',
      });
    } else {
      let salaries =
        data.salary !== 'negotiable' ? data.salary.split('-') : [0, 0];
      const body = {
        ...data,
        img,
        salaries,
        is_negotiable_salary: data.salary === 'negotiable',
        imgName: formData,
      };
      localStorage.setItem('personalData', JSON.stringify(body));
      tabIndex((prev: number) => prev + 1);
    }
  };
  const resetAll = () => {
    setOnReset(!onReset);
    localStorage.removeItem('personalData');
    localStorage.removeItem('otherDetails');
    localStorage.removeItem('contactData');
    localStorage.removeItem('employmentHistory');
    localStorage.removeItem('additionalInfo');
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <canvas id='watermarkCanvas' style={{ display: 'none' }}></canvas>
      <Grid gap='20px'>
        <HStack alignItems='start' justifyContent='space-between'>
          <Flex flexDirection='column'>
            <Text fontWeight={600}>Profile</Text>
            <Box h='150px' w='150px' position='relative'>
              {img && (
                <ChakraImage
                  borderRadius='10px'
                  h='100%'
                  w='100%'
                  objectFit='cover'
                  src={img || ''}
                />
              )}
              <Center
                _hover={{ opacity: 1 }}
                opacity={img ? 0 : 1}
                top='0'
                position='absolute'
                h='100%'
                w='100%'
                bg='#00000039'
              >
                {imgLoading ? (
                  <Text size={'sm'} color='whiteAlpha.400'>
                    Loading..
                  </Text>
                ) : (
                  <>
                    <BsFillCloudUploadFill style={{ color: 'white' }} />
                    <input
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        left: '0',
                        top: 0,
                        opacity: 0,
                      }}
                      onChange={handleImage}
                      type='file'
                      name=''
                      id=''
                    />
                  </>
                )}
              </Center>
            </Box>
          </Flex>
          {Object?.keys(data)?.length === 0 &&
            localStorage.getItem('personalData') && (
              <AddButton onClick={resetAll}>New Maid</AddButton>
            )}
        </HStack>
        <Grid gap='30px' gridTemplateColumns='1fr 1fr'>
          {PersonalInputs?.map((item) => (
            <Box key={item?.id} minH={'100px'}>
              {item.field == 'input' ? (
                <PrimaryInput
                  {...item}
                  register={register(item.key, {
                    required: item.errorMessage,
                  })}
                  placeholder={item.label}
                  errorMessage={errors[`${item.key}`]?.message?.toString()}
                />
              ) : (
                <DropDown
                  {...item}
                  register={register(item.key, {
                    required: item.errorMessage,
                  })}
                  defaultValue={`Select ${item.label}`}
                  errorMessage={errors[`${item.key}`]?.message?.toString()}
                />
              )}
            </Box>
          ))}
        </Grid>
        <HStack justifyContent='flex-end' mt='30px'>
          <Button
            type='submit'
            color='white'
            bg='brand.primary.900'
            rightIcon={<MdOutlineSkipNext style={{ color: 'white' }} />}
          >
            Next
          </Button>
        </HStack>
      </Grid>
    </form>
  );
};

export default PersonalDetails;
