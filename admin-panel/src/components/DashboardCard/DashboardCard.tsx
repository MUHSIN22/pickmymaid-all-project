import { Heading, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function DashboardCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <VStack
      p='0.5rem'
      px={0}
      borderRadius='8px'
      boxShadow='0 0 10px rgba(0,0,0,0.1)'
    >
      <Heading
        fontSize={{ base: '1rem' }}
        p='0.5rem'
        px='1rem'
        w='100%'
        textAlign='left'
        borderBottom='1px solid #2e2e2e'
      >
        {title}
      </Heading>
      {children}
    </VStack>
  );
}
