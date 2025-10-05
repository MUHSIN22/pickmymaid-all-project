import { Heading, Link, Text, VStack } from '@chakra-ui/react';

export default function ContactDetailsCard({
  title,
  link,
  text,
}: {
  title: string;
  link: string;
  text: string;
}) {
  return (
    <VStack
      maxW={{ base: '100%', sm: '15rem' }}
      alignItems='flex-start'
      borderLeft='2px solid rgba(0,0,0,0.1)'
      pl={4}
    >
      <Heading variant='smaller'>{title}</Heading>
      <Link href={link} target='_blank'>
        <Text variant='description'>
          {text?.split('<br>').map((content, index) => {
            return (
              <span>
                {content}
                {index !== text?.split('<br/>').length && <br />}
              </span>
            );
          })}
        </Text>
      </Link>
    </VStack>
  );
}
