import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Grid,
  HStack,
} from '@chakra-ui/react';
import { employmentHistoryInputs } from '../data/employmentHistory.data';
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from 'react-icons/md';
import EditorField from '../../../components/InputFields/EditorField/EditorField';
import { useForm } from 'react-hook-form';
import PrimaryInput from '../../../components/InputFields/PrimaryInput/PrimaryInput';
import useCustomToast from '../../../hooks/useCustomToast/useCustomToast';

type Job = {
  title: string;
  location: string;
  experiance: number | string;
  reason_leaving: string;
  job_description: string;
};

const EmploymentHistory = ({ tabIndex, data }: any) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [accIndex, setAccIndex] = useState(0);
  const [_, setDeleteCalled] = useState(false);
  const toast = useCustomToast();
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();

  const onsubmit = () => {
    const newJob = jobs.filter((_, i) => {
      return i !== jobs.length - 1;
    });
    localStorage.setItem('employmentHistory', JSON.stringify(newJob));
    tabIndex((pre: number) => pre + 1);
  };

  useEffect(() => {
    let defaultData = {
      title: '',
      location: '',
      experiance: 0,
      reason_leaving: '',
      job_description: '',
    };

    let empHistory: any = localStorage.getItem('employmentHistory');

    if (empHistory && Object.keys(data).length === 0) {
      empHistory = JSON.parse(empHistory);
      let obj = {};
      setJobs([...empHistory, defaultData]);
      empHistory.map((item: any, i: number) => {
        Object.keys(item).map((key) => {
          obj = { ...obj, [`${key}${i}`]: item[key] };
        });
      });
      reset(obj);

      setAccIndex(empHistory.length);
    } else if (Object.keys(data)?.length > 0) {
      data = data?.jobApplication;
      setJobs([...data.employmentHistory, defaultData]);
      let obj = {};
      data.employmentHistory.map((item: any, i: number) => {
        Object.keys(item).map((key) => {
          obj = { ...obj, [`${key}${i}`]: item[key] };
        });
      });
      reset(obj);

      setAccIndex(-1); // change after adding employment history in api
    } else {
      setJobs([defaultData]);
    }
  }, [data, localStorage.getItem('employmentHistory')]);

  const accordianHandler = (index: number) => {
    if (index === accIndex) {
      setAccIndex(jobs.length - 1);
    } else {
      setAccIndex(index);
    }
  };

  const deleteHandler = (index: number) => {
    const removedItem = jobs.filter((_, i) => index !== i);
    setAccIndex(jobs.length - 1);
    setJobs(removedItem);
  };

  const onSubmitHandler = (data: any, index: number) => {
    console.log('calleddl...');
    if (index == jobs.length - 1) {
      const newJob = {
        title: '',
        location: '',
        experiance: '',
        reason_leaving: '',
        job_description: '',
      };
      const lastIndex = jobs.length - 1;
      let job = jobs.filter((_, i) => i !== index);
      let cjob = {
        title: data[`title${index}`],
        location: data[`location${index}`],
        experiance: Number(data[`experiance${index}`]),
        reason_leaving: data[`reason_leaving${index}`],
        job_description: data[`job_description${index}`],
      };
      job = [...job, cjob, newJob];
      setJobs(job);
      // setJobs([...jobs, data]);
      setAccIndex(lastIndex + 1);
    } else {
      let job = jobs.map((item, i) => {
        if (index == i) {
          console.log('selectedItem is ', item.title);

          return {
            title: data[`title${index}`],
            location: data[`location${index}`],
            experiance: Number(data[`experiance${index}`]),
            reason_leaving: data[`reason_leaving${index}`],
            job_description: data[`job_description${index}`],
          };
        } else {
          return item;
        }
      });
      setJobs(job);
      toast('success', 'Edited Successfully', 'success');
    }
  };

  return (
    <Grid h='100%'>
      <Box>
        <Accordion allowToggle index={[accIndex]}>
          {jobs?.map((job: any, index) => (
            <AccordionItem key={index} mt={2} borderRadius={5} bg='bg.soft'>
              <h2>
                <AccordionButton
                  onClick={() => accordianHandler(index)}
                  bg={'brand.primary.900'}
                  color='white'
                  h='60px'
                >
                  <Box as='span' flex='1' textAlign='left'>
                    {jobs.length - 1 === index
                      ? 'Add New Employment History'
                      : job.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel mt={5} pb={4}>
                <Grid gridTemplateColumns='1fr 1fr' gap='30px'>
                  {employmentHistoryInputs.map((item) => {
                    return (
                      <PrimaryInput
                        {...item}
                        errorMessage={errors?.[
                          `${item.key}${index}`
                        ]?.message?.toString()}
                        register={register(`${item.key}${index}`)}
                      />
                    );
                  })}
                </Grid>
                <Box mt={5}>
                  <EditorField
                    control={control}
                    name={`job_description${index}`}
                    label='Job Description'
                  />
                </Box>

                <HStack mt={5} justifyContent='end'>
                  {index !== jobs.length - 1 && (
                    <Button
                      onClick={() => {
                        setDeleteCalled(true);
                        deleteHandler(index);
                      }}
                      bg='red'
                      color='white'
                    >
                      Delete
                    </Button>
                  )}

                  <Button
                    onClick={handleSubmit((data) => {
                      onSubmitHandler(data, index);
                    })}
                    bg='brand.primary.900'
                    color='white'
                  >
                    Save
                  </Button>
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
      <HStack
        alignItems='end'
        w={'100%'}
        justifyContent='space-between'
        mt='30px'
      >
        <Button
          color='white'
          bg='brand.primary.900'
          onClick={() => {
            tabIndex((pre: number) => pre - 1);
          }}
          leftIcon={<MdOutlineSkipPrevious style={{ color: 'white' }} />}
        >
          Previous
        </Button>
        <Button
          color='white'
          bg='brand.primary.900'
          type='submit'
          onClick={onsubmit}
          rightIcon={<MdOutlineSkipNext style={{ color: 'white' }} />}
        >
          Next
        </Button>
      </HStack>
    </Grid>
  );
};

export default EmploymentHistory;
