import { ListItem, Text, UnorderedList } from '@chakra-ui/react';

export default function RegularList({ list }: { list: string[] }) {
  return (
    <UnorderedList pl={6}>
      {list.map((listItem, index) => (
        <ListItem key={index}>
          <Text variant='description'>{listItem}</Text>
        </ListItem>
      ))}
    </UnorderedList>
  );
}
