import { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import PersonalDetails from './Sections/PersonalDetails';
import Contacts from './Sections/Contacts';
import OtherDetails from './Sections/OtherDetails';
import EmploymentHistory from './Sections/EmployementHistory';
import AdditionalInfo from './Sections/AdditionalInfo';
import { fetchMaidDataById } from '../../features/manageMaids/ManageMaidActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSearchParams } from 'react-router-dom';
import { IManageMaidData } from '../../types/pages/manageMaid/manageMaid.type';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maid, setMaid] = useState<IManageMaidData | null>(null);
  let [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const maidData: IManageMaidData | null = useAppSelector(
    (state) => state?.maids?.maid
  );
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      dispatch(fetchMaidDataById(id));
    } else {
      setMaid(null);
    }
  }, [id]);
  useEffect(() => {
    if (id && maidData) {
      setMaid(maidData);
    } else {
      setMaid(null);
    }
  }, [maidData, id]);
  return (
    <Tabs
      key={maid ? maid?.jobApplication?._id : new Date().getTime()}
      variant='soft-rounded'
      colorScheme='green'
      index={currentIndex}
      h='100%'
      display='grid'
      gridTemplateRows='80px 1fr'
      onChange={setCurrentIndex}
    >
      <TabList
        alignItems='center'
        bg='bg.soft'
        borderRadius='10px'
        h='80px'
        justifyContent='center'
        gap='15px'
      >
        <Tab
          h='45px'
          _selected={{ bg: 'brand.primary.900', color: 'white' }}
          borderRadius='5px'
        >
          Personal Details
        </Tab>
        <Tab
          isDisabled={!localStorage.getItem('personalData') ? true : false}
          h='45px'
          _selected={{ bg: 'brand.primary.900', color: 'white' }}
          borderRadius='5px'
        >
          Contact
        </Tab>
        <Tab
          isDisabled={!localStorage.getItem('contactData') ? true : false}
          h='45px'
          _selected={{ bg: 'brand.primary.900', color: 'white' }}
          borderRadius='5px'
        >
          Other Details
        </Tab>
        <Tab
          isDisabled={!localStorage.getItem('otherDetails') ? true : false}
          h='45px'
          _selected={{ bg: 'brand.primary.900', color: 'white' }}
          borderRadius='5px'
        >
          Employment History
        </Tab>
        <Tab
          isDisabled={!localStorage.getItem('employmentHistory') ? true : false}
          h='45px'
          _selected={{ bg: 'brand.primary.900', color: 'white' }}
          borderRadius='5px'
        >
          Additional Info
        </Tab>
      </TabList>

      <TabPanels h={'100%'}>
        <TabPanel px='0'>
          <PersonalDetails
            data={maid ?? {}}
            setMaid={setMaid}
            tabIndex={setCurrentIndex}
          />
        </TabPanel>
        <TabPanel h='100%' px='0'>
          <Contacts
            data={maid ?? {}}
            setMaid={setMaid}
            tabIndex={setCurrentIndex}
          />
        </TabPanel>
        <TabPanel h='100%' px='0'>
          <OtherDetails
            data={maid ?? {}}
            setMaid={setMaid}
            tabIndex={setCurrentIndex}
          />
        </TabPanel>
        <TabPanel h='100%' px='0'>
          <EmploymentHistory
            data={maid ?? {}}
            setMaid={setMaid}
            tabIndex={setCurrentIndex}
          />
        </TabPanel>
        <TabPanel h='100%' px='0'>
          <AdditionalInfo
            data={maid ?? {}}
            setMaid={setMaid}
            tabIndex={setCurrentIndex}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
