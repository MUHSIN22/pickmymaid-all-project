import { Box, Button, Grid, HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ContactsInput } from '../data/contact.data';
import PrimaryInput from '../../../components/InputFields/PrimaryInput/PrimaryInput';
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from 'react-icons/md';

const Contacts = ({ tabIndex, data }: any) => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    const storedData = localStorage.getItem('contactData');
    if (storedData && Object.keys(data).length === 0) {
      reset(JSON.parse(storedData));
    } else if (Object.keys(data)?.length > 0) {
      data = data?.jobApplication;
      const resetData = {
        uaenumber: data?.uae_no,
        botimnumber: data?.botim_number,
        whatsappnumber: data?.whatsapp_no,
        clocation: data?.current_location,
      };
      reset(resetData);
    } else {
      const resetData = {
        uaenumber: '+',
        botimnumber: '+',
        whatsappnumber: '+',
        clocation: '',
      };
      reset(resetData);
    }
  }, [data, localStorage.getItem('contactData')]);
  const onsubmit = (data: any) => {
    localStorage.setItem('contactData', JSON.stringify(data));
    tabIndex((prev: number) => prev + 1);
  };
  return (
    <Grid gap='20px' alignContent='space-between' h='100%'>
      <Grid p='30px 0' gridTemplateColumns='1fr 1fr' gap='30px'>
        {ContactsInput.map((item) => {
          return (
            <Box key={item.id}>
              <PrimaryInput
                {...item}
                register={register(item.key, {
                  required: item.required ? item.errorMessage : false,
                })}
                placeholder={`Enter ${item.label}`}
                errorMessage={errors[`${item.key}`]?.message?.toString()}
              />
            </Box>
          );
        })}
      </Grid>
      <HStack w={'100%'} justifyContent='space-between' mt='30px'>
        <Button
          color='white'
          bg='brand.primary.800'
          leftIcon={<MdOutlineSkipPrevious style={{ color: 'white' }} />}
          onClick={() => tabIndex((prev: number) => prev - 1)}
        >
          Previous
        </Button>
        <Button
          color='white'
          bg='brand.primary.800'
          rightIcon={<MdOutlineSkipNext style={{ color: 'white' }} />}
          onClick={handleSubmit(onsubmit)}
        >
          Next
        </Button>
      </HStack>
    </Grid>
  );
};

export default Contacts;
