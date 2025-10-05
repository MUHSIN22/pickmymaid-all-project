"use client";
import { Flex, Heading, VStack } from "@chakra-ui/react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { commonPadding } from "@/components/atoms/styles";
import { howItWorksData } from "./howItWorks.data";
import HomeHowCard from "@/components/atoms/Cards/homeHowCard/HomeHowCard";

export default function HowItWorksHome() {
  const { t } = useTranslation();
  return (
    <VStack sx={commonPadding} gap={{ base: 14 }} w="100%">
      <Heading as="h2" variant="sectionTitle">
        {t("home.working.heading")}
      </Heading>
      <Flex
        direction={{
          base: "column",
          sm: "row",
        }}
        alignItems={{ base: "center", md: "flex-start" }}
        flexWrap={{ base: "nowrap", sm: "wrap" }}
        gap={{ base: 2, sm: 8, "2xl": 16 }}
        w="100%"
      >
        {howItWorksData.map((item, index) => (
          <HomeHowCard
            key={item.id}
            content={t(item.description)}
            heading={t(item?.title)}
            number={index + 1}
          />
        ))}
      </Flex>
    </VStack>
  );
}
