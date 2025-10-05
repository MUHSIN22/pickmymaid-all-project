import { Box, Button, Hide, Image, Link, VStack } from '@chakra-ui/react';
import { sideNavList } from './sideNav.data';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { isSuperAdmin } from '../../../utils/isSuperAdmin/isSuperAdmin';
import { useLayoutEffect, useState } from 'react';

export default function SideNav({ isOpen }: { isOpen: boolean }) {
  const { pathname } = useLocation();
  const [superAdmin, setSuperAdmin] = useState(false);

  useLayoutEffect(() => {
    (async () => {
      const status = await isSuperAdmin(localStorage.getItem('token') || '');
      setSuperAdmin(status);
    })();
  }, []);

  console.log({ superAdmin });

  return (
    <VStack
      bg='white'
      h={{ base: 'calc(100vh - 4rem)', md: 'calc(100vh - 4rem)' }}
      rounded={{ base: 'none', md: 'xl' }}
      pos={{ base: 'fixed', md: 'sticky' }}
      top={{ base: '4rem', md: '2rem' }}
      left={{ base: 0, md: 'auto' }}
      zIndex='sticky'
      transform={{
        base: isOpen ? 'translateX(0%)' : 'translateX(-100%)',
        md: 'translateX(0)',
      }}
      transition='all 0.3s ease'
      boxShadow={{ base: '0px 0px 10px rgba(0,0,0,0.2)', md: 'none' }}
    >
      <Hide below='md'>
        <Box h='5rem' p={{ base: 2, md: 4 }}>
          <Image src='/logo/logo orange.webp' h='80%' />
        </Box>
      </Hide>
      <VStack p={{ base: 2, md: 4 }} gap={{ base: 0, md: 2 }}>
        {sideNavList.map((navItem) => (
          <>
            {(!navItem?.isProtected ||
              (navItem?.isProtected && superAdmin)) && (
              <Link as={RouterLink} to={navItem.path} w='100%' key={navItem.id}>
                <Button
                  leftIcon={navItem.icon}
                  w='100%'
                  justifyContent='flex-start'
                  variant='noBG'
                  color={
                    navItem.path === pathname ? 'white' : 'brand.primary.900'
                  }
                  bg={
                    navItem.path === pathname
                      ? 'brand.primary.900'
                      : 'transparent'
                  }
                >
                  {navItem.title}
                </Button>
              </Link>
            )}
          </>
        ))}
      </VStack>
    </VStack>
  );
}
