"use client";
import {
  Flex,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { commonPadding } from "@/components/atoms/styles";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { trustData } from "./trust.data";
import Image from "@/components/atoms/NextImageWrapper/Image";

export default function TrustAndSafety() {
  const { t } = useTranslation();
  const imageWidth = useBreakpointValue({ base: "3rem", md: "5rem" });
  return (
    <VStack sx={commonPadding} bg="#fff" w="100%" gap={{ base: "3rem" }}>
      <VStack textAlign="center">
        <Heading as="h1" variant="sectionTitle">
          {t("home.trustAndSafety.heading")}
        </Heading>
        <Text
          variant="description"
          fontSize={{ base: "0.9rem", sm: "1.1rem" }}
          maxW="50rem"
        >
          {t("home.trustAndSafety.description")}
        </Text>
      </VStack>
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        gap={{ base: "1.5rem", md: "3rem" }}
      >
        {trustData.map((data: any) => (
          <VStack key={data.value}>
            <Image
              src={data.image.src as string}
              aspectRatio={1 / 1}
              w={imageWidth}
              alt={data.value}
            />
            <Text
              variant="subTitle"
              fontSize={{ base: "0.9rem", sm: "1.2rem" }}
            >
              {data.value}
            </Text>
          </VStack>
        ))}
      </Flex>
    </VStack>
  );
}
