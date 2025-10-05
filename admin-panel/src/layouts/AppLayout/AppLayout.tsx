import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import TopNav from '../../components/navigations/topNav/TopNav';
import { SideNav } from '../../components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import useCustomToast from '../../hooks/useCustomToast/useCustomToast';
import { resetAuthState } from '../../features/manageAuth/manageAuthSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { resetTeamState } from '../../features/manageTeam/manageTeamSlice';

export default function AppLayout() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const flexRef = useRef<any>();
  const toast = useCustomToast();
  const dispatch = useAppDispatch();

  const teamMessage = useAppSelector((state) => state.team.message);
  const teamStatus = useAppSelector((state) => state.team.status);

  const authMessage = useAppSelector((state) => state.auth.message);
  const authStatus = useAppSelector((state) => state.auth.status);

  useMemo(() => {
    if (!['loading', 'idle'].includes(teamStatus) && teamMessage) {
      if (teamStatus === 'error') {
        toast('Error happened', teamMessage || '', 'error');
      } else if (teamStatus === 'success') {
        toast('Success', teamMessage || '');
      }
      dispatch(resetTeamState());
    }
  }, [teamStatus]);

  useMemo(() => {
    if (!['loading', 'idle'].includes(authStatus) && authMessage) {
      if (authStatus === 'error') {
        toast('Error happened', authMessage || '', 'error');
      } else if (authStatus === 'success') {
        toast('Success', authMessage || '');
      }
      dispatch(resetAuthState());
    }
  }, [authStatus]);

  useEffect(() => {
    setContainerWidth(flexRef.current?.offsetWidth || 0);
  }, [flexRef]);

  return (
    <Flex
      bg='bg.primary'
      minH='100vh'
      w='100%'
      p={{ base: 0, md: 8 }}
      gap={{ base: 0, md: 4 }}
    >
      <SideNav isOpen={isOpen} />
      <Flex flexDir='column' flex={2} gap={{ base: 0, md: 4 }} ref={flexRef}>
        <TopNav isOpen={isOpen} setOpen={setOpen} />
        <Box
          bg='white'
          w={`${containerWidth}px`}
          h={{ base: 'auto', md: 'calc(100vh - 10rem)' }}
          pos='sticky'
          top={{ base: 0, md: '8rem' }}
          rounded={{ base: 'none', md: 'xl' }}
          overflowY='auto'
          p={{ base: 4, md: 6 }}
        >
          {/* <Box> */}
          <Outlet />
          {/* </Box> */}
        </Box>
      </Flex>
    </Flex>
  );
}
