import { Center, Grid, Text } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from '@/components/atoms/Icons/Icons';

const Pagination = () => {
  return (
    <Grid
      borderRadius='10px'
      border='1px solid #B0BABF '
      w='350px'
      gridTemplateColumns='repeat(7,1fr)'
    >
      <Center py={2} borderRight='1px solid #B0BABF'>
        <BiLeftArrowAlt />
      </Center>
      <Center py={2} borderRight='1px solid #B0BABF'>
        <Text>1</Text>
      </Center>
      <Center py={2} borderRight='1px solid #B0BABF'>
        <Text>2</Text>
      </Center>
      <Center py={2} borderRight='1px solid #B0BABF'>
        <Text>...</Text>
      </Center>
      <Center py={2} borderRight='1px solid #B0BABF'>
        <Text>4</Text>
      </Center>
      <Center py={2} borderRight='1px solid #B0BABF'>
        <Text>5</Text>
      </Center>
      <Center py={2} borderRight='1px solid #B0BABF'>
        <BiRightArrowAlt />
      </Center>
    </Grid>
  );
};

export default Pagination;
