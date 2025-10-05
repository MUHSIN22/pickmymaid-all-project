import {
  Avatar,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
} from '@chakra-ui/react';
import Hamburger from 'hamburger-react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { adminLogout } from '../../../features/manageAuth/manageAuthAction';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RiSearch2Line } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';
import { handleSearch } from '../../../features/utilSlice/utilsSlice';

export default function TopNav({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: any;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search);

  const loading = useAppSelector((state) => state?.payments?.loading);

  const logoutUser = async () => {
    let response = await dispatch(adminLogout());
    if (response.type === 'auth/admin-logout/fulfilled') {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  useEffect(() => {
    dispatch(handleSearch(debouncedSearch));
  }, [debouncedSearch]);

  return (
    <Flex
      w='100%'
      h={{ base: '4rem', md: '5rem' }}
      p={{ base: 2, md: 4 }}
      bg='white'
      gap={4}
      rounded={{ base: 'none', md: 'xl' }}
      justifyContent={{ base: 'space-between' }}
      alignItems='center'
      pos='sticky'
      top={{ base: '0', md: '2rem' }}
      zIndex='sticky'
      borderBottom={{ base: '2px solid', md: 'none' }}
      borderColor='brand.primary.600'
    >
      <Show above='sm'>
        <InputGroup maxW='25rem'>
          <InputLeftElement>
            <RiSearch2Line />
          </InputLeftElement>
          <Input
            placeholder='Search here'
            border='2px solid rgba(0,0,0,0.2)'
            onChange={(event) => setSearch(event.target.value)}
          />
        </InputGroup>
      </Show>
      <Show below='md'>
        <Hamburger toggled={isOpen} onToggle={() => setOpen(!isOpen)} />
      </Show>
      <Menu>
        <MenuButton>
          <Avatar name='Super Admin' size={{ base: 'md' }} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={logoutUser} isDisabled={loading}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
