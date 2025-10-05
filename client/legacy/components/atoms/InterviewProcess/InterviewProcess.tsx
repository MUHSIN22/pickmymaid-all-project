import {
  AspectRatio,
  Box,
  Grid,
  HStack,
  Heading,
  Hide,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function InterviewProcess({
  index,
  heading,
  description,
  icon,
}: {
  index: number;
  heading: String;
  description: String;
  icon: any;
}) {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        sm: index % 2 !== 0 ? 'auto 8rem' : '8rem auto',
        md: index % 2 !== 0 ? 'auto 8rem' : '8rem auto',
      }}
      gap='2rem'
      p='0 1.5rem'
      borderLeft={index % 2 !== 0 ? '1px solid black' : ''}
      borderRight={index % 2 === 0 ? '1px solid black' : ''}
    >
      <Hide below='sm'>
        {index % 2 === 0 && (
          <Box
            bg='brand.primary.50'
            borderRadius='30px'
            p='1rem'
            w='100%'
            display='flex'
            alignItems='center'
          >
            <AspectRatio ratio={1 / 1} w='100%'>
              <Image src={icon.src} w='100%' objectFit='contain' />
            </AspectRatio>
          </Box>
        )}
      </Hide>
      <VStack alignItems='flex-start'>
        <HStack
          justifyContent={index % 2 !== 0 ? 'flex-start' : 'end'}
          gap={{ base: '0.5rem', md: '1.5rem' }}
          alignItems='flex-end'
          w='100%'
          flexDir={index % 2 !== 0 ? 'row' : 'row-reverse'}
        >
          <Heading
            fontSize={{ base: '2rem', md: '4rem' }}
            lineHeight={1}
            color='brand.primary.300'
            fontWeight={500}
          >
            0{index}
          </Heading>
          <Heading variant='secondary' fontWeight={500}>
            {heading}
          </Heading>
        </HStack>
        <Text
          variant='description'
          background='#f2f6fd'
          padding='1rem'
          borderRadius='8px'
          maxW='55rem'
          textAlign='left'
        >
          {description}
        </Text>
      </VStack>
      <Hide below='sm'>
        {index % 2 !== 0 && (
          <Box
            bg='brand.primary.50'
            borderRadius='30px'
            p='1rem'
            w='100%'
            display='flex'
            alignItems='center'
          >
            <AspectRatio ratio={1 / 1} w='100%'>
              <Image src={icon.src} w='100%' objectFit='contain' />
            </AspectRatio>
          </Box>
        )}
      </Hide>
    </Grid>
  );
}
