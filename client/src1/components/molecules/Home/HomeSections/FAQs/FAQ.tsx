"use client";

import VStack from "../../../../ui/VStack";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FAQData } from "./FAQData";
import {
  RiAddCircleLine,
  RiIndeterminateCircleLine,
} from "../../../../atoms/Icons/Icons";

export default function FAQ() {
  return (
    <VStack className="common-padding bg-white w-[100%] gap-[3rem]">
      <VStack className="text-center items-center">
        <h1 className="heading-section-title">Frequently Asked Questions</h1>
        <p className="text-description text-[0.9rem] sm:text-[1.1rem] max-w-[50rem]">
          We help you connect with families and domestic workers to find their
          needs
        </p>
      </VStack>
      <div className="w-full divide-y divide-white/5 rounded-xl bg-white/5">
        {FAQData.map((faq: any) => (
          <Disclosure
            key={faq.id}
            as="div"
            className="border-t-none border-b-[1px] border-b-[rgba(0,0,0,0.1)] w-[100%]"
            defaultOpen={false}
          >
            {({ open }) => (
              <>
                <DisclosureButton className="group p-4 hover:bg-[rgba(255,111,81,0.05)] flex w-full items-center justify-between">
                  <span className="text-[0.9rem] text-left flex-[10] sm:text-[1rem] md:text-[1.3rem]">
                    {faq.question}
                  </span>
                  {!open ? (
                    <RiAddCircleLine className=" w-[3rem] text-primary-300" />
                  ) : (
                    <RiIndeterminateCircleLine className=" w-[3rem] text-primary-300" />
                  )}
                </DisclosureButton>
                <DisclosurePanel className="p-4 text-description">
                  {faq.answer}
                  {faq.links && (
                    <VStack className="gap-[1rem] items-start pt-[1rem]">
                      <ul>
                        {faq.links &&
                          faq.links?.map((link: any) => (
                            <li className="underline text-[blue]">
                              <a href={link.link}>{link.title}</a>
                            </li>
                          ))}
                      </ul>
                      {faq.answer2 && <p>{faq.answer2}</p>}
                    </VStack>
                  )}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </VStack>
  );
}

{
  /* <Accordion allowToggle w='100%' maxW='1200px' colorScheme='orange'>
      {FAQData.map((item) => (
        <AccordionItem
          key={item.id}
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
                  {t(item.question)}
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
                <Text variant='description'>{t(item.answer)}</Text>
                {item.links && (
                  <VStack gap='1rem' alignItems='flex-start' pt='1rem'>
                    <UnorderedList>
                      {item.links &&
                        item.links?.map((link) => (
                          <ListItem textDecoration='underline' color='blue'>
                            <a href={link.link}>{t(link.title)}</a>
                          </ListItem>
                        ))}
                    </UnorderedList>
                    {item.answer2 && <Text>{t(item.answer2)}</Text>}
                  </VStack>
                )}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion> */
}
