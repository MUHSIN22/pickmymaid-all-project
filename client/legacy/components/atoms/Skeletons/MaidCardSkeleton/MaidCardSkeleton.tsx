import { AspectRatio, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';


export default function MaidCardSkeleton() {
  return (
    <VStack
      // w='100%'
      bg='white'
      p={{ base: 2, sm: 4 }}
      border='1px solid'
      borderColor='brand.primary.300'
      borderRadius='35px 0px 35px 0'
      cursor='pointer'
      userSelect='none'
      h='100%'
      _hover={{
        '& img': {
          transform: 'scale(1.1)',
          transition: 'transform 0.3s ease-in-out',
        },
        boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
      }}
    >
      <AspectRatio ratio={1 / 1} w={{ base: '90%', md: '100%' }}>
        <Skeleton
          w='100%'
          h='100%'
          borderRadius={{ base: '0px 35px 0px 35px' }}
        />
      </AspectRatio>
      <SkeletonText />
      <Skeleton w='100%' h='3px' />
      <SkeletonText />
      <Skeleton w='100%' h='3px' />
      <SkeletonText />
    </VStack>
  );
}
