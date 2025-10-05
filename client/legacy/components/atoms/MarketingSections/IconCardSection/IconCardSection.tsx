import { Flex, Heading, Image, VStack } from '@chakra-ui/react';
import { commonPadding } from '../../styles';

export default function IconCardSection({
  sectionTitle,
  data,
}: {
  sectionTitle?: string;
  data: any[];
}) {
  return (
    <VStack w='100%' gap={{ base: 2, sm: 10 }} sx={commonPadding}>
      <Heading as='h1' variant='sectionTitle' textAlign='left' mr='auto' color='brand.primary.300'>
        {sectionTitle}
      </Heading>
      <Flex w='100%' flexWrap='wrap' justifyContent='center' gap={4}>
        {data.map((item, index) => (
          <VStack
            key={index}
            p={4}
            borderRadius={6}
            border='1px solid'
            borderColor='brand.primary.300'
            flex={2}
            alignItems='flex-start'
            minW='9rem'
            maxW='15rem'
          >
            <Image src={item.image} />
            <Heading variant='smaller'>{item.title}</Heading>
          </VStack>
        ))}
      </Flex>
    </VStack>
  );
}
