"use client";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { commonPadding } from "@/components/atoms/styles";
import { pricingData } from "./pricing.data";
import RevampedPricingCard from "@/components/atoms/Cards/RevampedPricingCard/RevampedPricingCard";
import securedPayment from "@/assets/images/secure_payment.webp";
import Image from "@/components/atoms/NextImageWrapper/Image";

export default function Pricing() {
  const { t } = useTranslation();
  const imageWidth = useBreakpointValue({ base: "20rem", sm: "30rem" });

  return (
    <Box sx={commonPadding} w="100%" py={8} bg="#dfdddd75">
      <VStack gap={{ base: 12, sm: 20 }} w="100%">
        <VStack gap={{ base: "1rem" }}>
          <Heading as="h2" variant="sectionTitle">
            {t("home.pricing.headingHome")}
          </Heading>
          <Text variant="subTitle" textAlign="center">
            {t("home.pricing.subHeading")}
          </Text>
          <Image
            src={securedPayment.src}
            aspectRatio={4 / 1}
            w={imageWidth}
            alt="accepted payments"
          />
        </VStack>
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} gap="1rem">
          {pricingData.map((item, index) => (
            <RevampedPricingCard data={item} key={index} />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
