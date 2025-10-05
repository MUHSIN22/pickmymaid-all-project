"use client";
import { Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { commonPadding } from "@/components/atoms/styles";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { trustData } from "./uaeTrust.data";

export default function WhyUAETrust() {
  const { t } = useTranslation();

  return (
    <VStack
      sx={commonPadding}
      pt="3rem"
      pb="3rem"
      w="100%"
      gap={{ base: "3rem" }}
    >
      <VStack textAlign="center">
        <Heading as="h1" variant="sectionTitle">
          {t("home.whyUAETrust.heading")}
        </Heading>
      </VStack>

      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 4 }}
        gap={{ base: ".5rem", md: "1rem" }}
      >
        {trustData.map((item) => (
          <VStack
            key={item.title}
            flex={1}
            flexDir="row"
            alignItems="flex-start"
            gap="1rem"
            borderRadius="30px 0"
          >
            <Image
              src={item.icon.src}
              w={{ base: "2rem", md: "5rem" }}
              alt={item.title}
            />
            <VStack justifyContent="flex-start" textAlign="left">
              <Text
                variant="description"
                fontWeight={600}
                color="brand.primary.300"
                w="100%"
              >
                {t(item.title)}
              </Text>
              <Text fontSize={{ base: "0.7rem", sm: "0.9rem" }}>
                {t(item.desc)}
              </Text>
            </VStack>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
