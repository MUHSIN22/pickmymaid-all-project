import {
  AspectRatio,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import reviewBg from '@/assets/images/campaign/reviewBg.svg';
import { commonPadding } from '@/components/atoms/styles';
import googleImage from '@/assets/images/4 star review.png';
import { reviews } from './reviews.data';
import ReviewCard from '@/components/atoms/Cards/ReviewCard/ReviewCard';

export default function ReviewSection() {
  return (
    <VStack
      bg={`url('${reviewBg?.src}')`}
      bgRepeat='no-repeat'
      bgPos='center'
      bgSize='cover'
      w='100%'
      sx={commonPadding}
      py={{ base: '3rem', md: '5rem' }}
      gap={{ base: '1rem', sm: '4rem' }}
      pos='relative'
    >
      <VStack>
        <Heading variant='sectionTitle' color='black'>
          Testimonial from our users
        </Heading>
        <Text
          variant='subTitle'
          color='black'
          textTransform='unset'
          textAlign='center'
        >
          Register Now - Get Access to 1500+ Maids profiles who're ready join
        </Text>
      </VStack>
      <AspectRatio
        ratio={1300 / 415}
        w={{ base: '8rem', md: '10rem' }}
        pos={{ base: 'relative', md: 'absolute' }}
        top={{ base: 0, lg: '5rem' }}
        left={{ base: 0, lg: 8, '2xl': 32 }}
      >
        <Image loading='lazy' src={googleImage.src} w='100%' h='100%' />
      </AspectRatio>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        gap={{ base: '1rem', lg: '2rem' }}
      >
        {reviews.map((review, index) => (
          <ReviewCard
            text={review.text}
            name={review.name}
            title={review.type}
            image={review?.image}
            key={index}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
