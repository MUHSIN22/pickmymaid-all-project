import {
  Box,
  Heading,
  Image,
  ListItem,
  Show,
  SimpleGrid,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { commonPadding } from '../../styles';

export default function ZigZagSection({
  sectionTitle,
  data,
}: {
  sectionTitle?: string;
  data: any;
}) {
  return (
    <VStack w='100%' gap={{ base: 2, sm: 10 }} sx={commonPadding}>
      {sectionTitle && (
        <Heading as='h1' variant='sectionTitle' color='brand.primary.300'>
          {sectionTitle}
        </Heading>
      )}
      {data.map((item, index) => (
        <>
          <SimpleGrid columns={{base: 1, sm: 2}} gap={10}>
            {index % 2 !== 0 && (
              <Show above='sm'>
                <Box
                  p={4}
                  borderRadius={{ base: '0px 35px 0px 35px' }}
                  border='1px solid'
                  borderColor='brand.primary.300'
                >
                  <Image
                    src={item.image}
                    w='100%'
                    h='100%'
                    objectFit='cover'
                    borderRadius='0px 35px 0px 35px'
                  />
                </Box>
              </Show>
            )}
            <VStack alignItems='flex-start'>
              <Heading as='h1' variant='secondary'>{item.title}</Heading>
              <Text variant='description'>{item.content}</Text>
              {item.points && (
                <UnorderedList>
                  {item.points.map((point, pointIndex) => (
                    <ListItem key={pointIndex}>
                      <Text variant='description'>{point}</Text>
                    </ListItem>
                  ))}
                </UnorderedList>
              )}
            </VStack>
            {index % 2 === 0 && (
              <Show above='sm'>
                <Box
                  p={4}
                  borderRadius={{ base: '0px 35px 0px 35px' }}
                  border='1px solid'
                  borderColor='brand.primary.300'
                >
                  <Image
                    src={item.image}
                    w='100%'
                    h='100%'
                    objectFit='cover'
                    borderRadius='0px 35px 0px 35px'
                  />
                </Box>
              </Show>
            )}
          </SimpleGrid>
        </>
      ))}
    </VStack>
  );
}
