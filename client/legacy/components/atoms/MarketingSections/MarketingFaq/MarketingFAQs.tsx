import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { commonPadding } from '../../styles';
import { RiAddCircleLine, RiIndeterminateCircleLine } from '../../Icons/Icons';

export default function MarketingFAQs({ FAQData }: { FAQData: any[] }) {
  return (
    <VStack w='100%' gap={{ base: 2, sm: 10 }} sx={commonPadding}>
      <Heading as='h1' variant='sectionTitle' color='brand.primary.300'>
        Frequently asked questions
      </Heading>
      <Accordion allowToggle w='100%' maxW='1200px' colorScheme='orange'>
        {FAQData.map((item, index) => (
          <AccordionItem
            key={index}
            borderTop='none'
            borderBottom='1px solid rgba(0,0,0,0.2)'
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  _expanded={{ bg: 'transparent' }}
                  _hover={{ bg: 'rgba(255, 111, 81, 0.05)' }}
                >
                  <Heading
                    fontSize={{ base: '0.9rem', sm: '1rem', md: '1.3rem' }}
                    flex={1}
                    textAlign='left'
                    fontWeight={500}
                  >
                    {item.question}
                  </Heading>
                  {!isExpanded ? (
                    <Icon
                      as={RiAddCircleLine}
                      color='brand.primary.300'
                      fontSize={{ base: '2rem' }}
                    />
                  ) : (
                    <Icon
                      as={RiIndeterminateCircleLine}
                      color='brand.primary.300'
                      fontSize={{ base: '2rem' }}
                    />
                  )}
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text variant='description'>{item.answer}</Text>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
}
