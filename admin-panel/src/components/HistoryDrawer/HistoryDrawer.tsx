import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdArrowRight, MdHistory } from 'react-icons/md';
import { axiosInstance } from '../../app/axiosInstance';
import moment from 'moment';

export default function HistoryDrawer({
  isOpen,
  onClose,
  maidId,
}: {
  isOpen: boolean;
  onClose: any;
  maidId: string;
}) {
  const [history, setHistory] = useState<any[]>([]);
  const getMaidHistory = async () => {
    const history = await axiosInstance.get(`/admin/history/${maidId}`);
    console.log(history, 'this is history');
    if (history?.status === 200) {
      setHistory(history.data.data);
    }
  };

  useEffect(() => {
    getMaidHistory();
  }, [maidId]);
  console.log(history, 'this is history');
  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      //   finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader
          display='flex'
          alignItems='center'
          justifyContent='flex-start'
          gap='0.5rem'
        >
          <MdHistory />
          Maid History
        </DrawerHeader>

        <DrawerBody p={0}>
          {history?.length === 0 ? (
            <Text px='1rem'>No History available</Text>
          ) : (
            <>
              {history.map((item) => (
                <VStack
                  alignItems='flex-start'
                  py='0.5rem'
                  borderBottom='1px solid rgba(0,0,0,0.1)'
                  _hover={{
                    bg: 'rgb(197,194,255,0.16)',
                  }}
                >
                  <Accordion allowMultiple>
                    <AccordionItem border='none'>
                      {({ isExpanded }) => (
                        <>
                          <Text fontWeight={600}>
                            <AccordionButton p={0}>
                              <HStack>
                                <MdArrowRight
                                  fontSize='1.5rem'
                                  style={{
                                    transform: isExpanded
                                      ? 'rotate(90deg)'
                                      : 'rotate(0)',
                                  }}
                                />
                                <Text>
                                  {moment(item.createdAt).format(
                                    'D MMMM, hh:mm A'
                                  )}
                                </Text>
                              </HStack>
                            </AccordionButton>
                          </Text>
                          <AccordionPanel>
                            {item.revision === 0 ? (
                              <Text fontSize='xs'>New Maid record added</Text>
                            ) : (
                              <VStack
                                textAlign='left'
                                w='100%'
                                alignItems='flex-start'
                              >
                                <Text fontSize='sm' fontWeight={600}>
                                  Changes:{' '}
                                </Text>
                                <OrderedList pl='1rem'>
                                  {Object.keys(item.changes).map(
                                    (item, index) => (
                                      <ListItem
                                        textTransform='capitalize'
                                        fontSize='xs'
                                        key={index}
                                      >
                                        {item.replace(/_/g, ' ')}
                                      </ListItem>
                                    )
                                  )}
                                </OrderedList>
                              </VStack>
                            )}
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>
                  <HStack px='1rem' justifyContent='space-between' w='100%'>
                    <HStack>
                      <Box w='10px' h='10px' borderRadius='50%' bg='teal' />
                      <Text fontSize='xs'>{item.updated_by?.name}</Text>
                    </HStack>
                    <Text fontSize='xs'>Revision: {item.revision}</Text>
                  </HStack>
                </VStack>
              ))}
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
