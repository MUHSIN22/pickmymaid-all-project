import {
  AspectRatio,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { commonPadding } from '../../styles';

export default function ImageCardSection({
  sectionTitle,
  subTitle,
  data,
}: {
  sectionTitle: string | undefined;
  subTitle: string | undefined;
  data: any[];
}) {
  return (
    <VStack w='100%' gap={{ base: 2, sm: 10 }} sx={commonPadding}>
      <VStack gap={4}>
        <Heading as='h1' variant='sectionTitle' color='brand.primary.300'>
          {sectionTitle}
        </Heading>
        <Heading variant='smaller' textAlign='center' maxW='900px'>{subTitle}</Heading>
      </VStack>
      <VStack gap={4}>
        {data.map((item, index) => (
          <Grid
            gap={8}
            alignItems='center'
            key={index}
            p={4}
            borderRadius={{ base: '0px 35px 0px 35px' }}
            border='1px solid'
            borderColor='brand.primary.300'
            gridTemplateColumns={{base: '1fr', sm: '15rem auto'}}
          >
            <AspectRatio ratio={1 / 1} justifySelf='center' w={{base: '80%', sm: '100%'}}>
              <Image
                src={item.image}
                height='100%'
                w='100%'
                borderRadius={{ base: '0px 20px 0px 20px' }}
                objectFit='cover'
              />
            </AspectRatio>
            <Text variant='description'>{item.content}</Text>
          </Grid>
        ))}
      </VStack>
    </VStack>
  );
}
