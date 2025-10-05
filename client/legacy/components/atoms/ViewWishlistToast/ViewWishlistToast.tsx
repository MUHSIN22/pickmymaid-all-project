import { AspectRatio, HStack, Image, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function ViewWishlistToast({ image, text }) {
  const router = useRouter();
  return (
    <HStack
      borderRadius='10px'
      bg='rgba(0,0,0,0.8)'
      color='#fff'
      position='fixed'
      bottom={0}
      left={0}
      p='0.5rem'
      gap={2}
    >
      <AspectRatio ratio={1 / 1} w='3rem'>
        <Image src={image} w='100%' h='100%' borderRadius='4px' />
      </AspectRatio>
      <Text>{text}</Text>
      <Link onClick={() => router.push("/wishlist")} fontSize='1rem' fontWeight={600}>
        View
      </Link>
    </HStack>
  );
}
