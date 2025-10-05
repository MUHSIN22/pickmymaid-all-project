import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Select,
} from '@chakra-ui/react';

import { LanguageInputs, OtherDetailsInput } from '../data/otherdetails.data';
import PrimaryInput from '../../../components/InputFields/PrimaryInput/PrimaryInput';
import DropDown from '../../../components/InputFields/dropdown/DropDown';
import { useForm } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect, useState, useRef } from 'react';
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from 'react-icons/md';

const OtherDetails = ({ tabIndex, data }: any) => {
  const [showPrev, setShowPrev] = useState(false);
  const [multiSelectWidth, setMultiSelectWidth] = useState(0);
  const [skills, setSkills] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [languages, setLanguages] = useState<
    {
      id: string;
      name: string;
      speak: number;
      read: number;
      write: number;
    }[]
  >([]);
  const normalInputs = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 1000);
  }, []);

  useEffect(() => {
    let interval: any;
    interval = setInterval(() => {
      if (normalInputs.current && normalInputs.current.offsetWidth !== 0) {
        setMultiSelectWidth(normalInputs.current.offsetWidth);
        // setIsWidthSet(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const ylinkValue = watch('ylink');
  const onsubmit = (data: any) => {
    let newSkills = skills.map((item: any) => item.label);
    data = { ...data, languages, skills: newSkills };
    localStorage.setItem('otherDetails', JSON.stringify(data));
    tabIndex((prev: number) => prev + 1);
  };

  useEffect(() => {
    if (ylinkValue && ylinkValue.length > 0) {
      setShowPrev(true);
    } else {
      setShowPrev(false);
    }
  }, [ylinkValue]);
  useEffect(() => {
    let otherDetailsFromLocal: any = localStorage.getItem('otherDetails');
    otherDetailsFromLocal = JSON.parse(otherDetailsFromLocal);
    if (otherDetailsFromLocal && Object.keys(data).length === 0) {
      setLanguages(otherDetailsFromLocal.languages);
      let newSkills = otherDetailsFromLocal?.skills?.map((skill: any) => {
        return { label: skill, value: skills };
      });
      setSkills(newSkills);
      reset(otherDetailsFromLocal);
    } else if (Object.keys(data)?.length > 0) {
      data = data?.jobApplication;
      let newSkills = data?.skills?.map((skill: any) => {
        return { label: skill, value: skills };
      });
      setSkills(newSkills);
      let resetData = {
        ylink: data?.youtube_link,
        visaStatus: data?.visa_status,
        available_from: data?.available_from,
        option: data?.option,
        languages: data?.language,
        visa_expire: data?.visa_expire,
      };
      setLanguages(data?.language);
      reset(resetData);
    } else {
      setSkills([]);
      let resetData = {
        ylink: null,
        visaStatus: null,
        option: null,
        languages: null,
        visa_expire: null,
        available_from: null,
      };
      setLanguages([]);
      reset(resetData);
    }
  }, [data, localStorage.getItem('otherDetails')]);
  const getEmbedUrl = (url: string) => {
    if (url) {
      let embedUrl = '';
      const videoId = url.split('v=')[1];
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else {
        const arr = url.split('/');
        const videoId = arr[arr.length - 1];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      return embedUrl;
    }
  };
  const deleteLanguage = (data: any) => {
    const newLanguage = languages.filter((item: any) => {
      return item.id !== data.id;
    });
    setLanguages(newLanguage);
  };
  const languageChangeHandler = (index: number, key: string, value: string) => {
    const newLanguage = languages.map((item: any, i) => {
      if (index === i) {
        let retObj;
        if (key === 'name') {
          retObj = { ...item, [key]: value };
        } else {
          retObj = { ...item, [key]: Number(value) };
        }
        return retObj;
      }
      return item;
    });
    setLanguages(newLanguage);
  };
  const newLangAdded = () => {
    setLanguages([
      ...languages,
      {
        id: crypto.randomUUID(),
        name: 'English',
        speak: 0,
        read: 0,
        write: 0,
      },
    ]);
  };
  return (
    <form style={{ height: '100%' }} onSubmit={handleSubmit(onsubmit)}>
      <Grid gap='20px' h={'100%'}>
        <Box>
          <Collapse in={showPrev} animateOpacity>
            <Center key={ylinkValue}>
              {ylinkValue && flag && (
                <iframe
                  width='560'
                  height='315'
                  src={getEmbedUrl(ylinkValue)}
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  //   allowfullscreen
                ></iframe>
              )}
            </Center>
          </Collapse>
          <Grid
            ref={normalInputs}
            columnGap='30px'
            mt={5}
            gridTemplateColumns='1fr 1fr'
          >
            {OtherDetailsInput?.map((item) => (
              <Box ref={normalInputs} key={item?.id} minH={'100px'}>
                {item.field == 'input' ? (
                  <PrimaryInput
                    {...item}
                    register={register(item.key, {
                      required: item.required ? item.errorMessage : false,
                    })}
                    placeholder={item.label}
                    errorMessage={errors[`${item.key}`]?.message?.toString()}
                  />
                ) : item.field === 'select' ? (
                  <DropDown
                    {...item}
                    defaultValue={`Select ${item.label}`}
                    register={register(item.key, {
                      required: item.required ? item.errorMessage : false,
                    })}
                    errorMessage={errors[`${item.key}`]?.message?.toString()}
                  />
                ) : (
                  item.multiValues && (
                    <Box width={`${multiSelectWidth / 2 - 15}px`}>
                      <FormControl maxW='100%'>
                        <FormLabel>Skills</FormLabel>
                        <div>
                          <MultiSelect
                            options={item.multiValues}
                            value={skills}
                            onChange={setSkills}
                            hasSelectAll={false}
                            labelledBy='Select'
                          />
                        </div>
                      </FormControl>
                    </Box>
                  )
                )}
              </Box>
            ))}
          </Grid>
          {languages.map((item: any, index) => (
            <Grid
              key={index}
              gap='20px'
              gridTemplateColumns='2fr 1fr 1fr 1fr 1fr'
            >
              {LanguageInputs?.map((inputs) => (
                <FormControl key={inputs.id}>
                  <FormLabel variant='primary'>{inputs.label}</FormLabel>
                  <Select
                    value={item[inputs.key]}
                    onChange={(e) =>
                      languageChangeHandler(index, inputs.key, e.target.value)
                    }
                  >
                    {inputs?.values?.map((values, i) => (
                      <option key={i} value={values.value}>
                        {values.key}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              ))}
              <Button onClick={() => deleteLanguage(item)} alignSelf='end'>
                Delete
              </Button>
            </Grid>
          ))}
          <Flex mt={5} justifyContent='end'>
            <Button onClick={newLangAdded}>
              {languages.length == 0 ? 'Add Language' : 'Add Another Language'}
            </Button>
          </Flex>
        </Box>
        <HStack w={'100%'} justifyContent='space-between' mt='30px'>
          <Button
            color='white'
            bg='brand.primary.900'
            leftIcon={<MdOutlineSkipPrevious style={{ color: 'white' }} />}
            onClick={() => tabIndex((prev: number) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            color='white'
            bg='brand.primary.900'
            type='submit'
            rightIcon={<MdOutlineSkipNext style={{ color: 'white' }} />}
          >
            Next
          </Button>
        </HStack>
      </Grid>
    </form>
  );
};

export default OtherDetails;
