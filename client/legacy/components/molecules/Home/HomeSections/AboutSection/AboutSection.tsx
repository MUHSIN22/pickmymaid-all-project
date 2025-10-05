"use client";
import {
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import aboutImg from "@/assets/images/Home/banner-image-3.webp";
import { commonPadding } from "@/components/atoms/styles";
import { getAlternativeText } from "@/utils/altSelector";
import Image from "@/components/atoms/NextImageWrapper/Image";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <VStack sx={commonPadding} gap={{ base: 5, md: 10 }}>
      <Heading as="h2" variant="sectionTitle">
        {t("home.about.heading")}
      </Heading>
      <SimpleGrid
        w="100%"
        columns={{ base: 1, sm: 2 }}
        gap={{ base: 4, sm: "5%", md: "15%" }}
      >
        <Box
          display={{ base: "block", sm: "none" }}
          pos="relative"
          w="100%"
          _after={{
            content: '""',
            pos: "absolute",
            top: 0,
            left: 0,
            borderRadius: "20px 0 20px 0",
            bg: "transparent",
            border: "1px solid",
            borderColor: "brand.primary.300",
            transform: "translateX(2%) translateY(2%)",
            w: "100%",
            zIndex: 1000,
            h: "100%",
          }}
        >
          <Image
            aspectRatio={584 / 389}
            src={aboutImg.src}
            w="100%"
            h="100%"
            style={{ borderRadius: "0 20px 0 20px", zIndex: "100" }}
            alt={getAlternativeText()}
          />
        </Box>

        <VStack gap={{ base: 0, sm: 4 }} alignSelf="center">
          <Heading as="h1" variant="secondary">
            {t("home.about.sectionHeading")}
          </Heading>
          <Text variant="description">
            {t("home.about.sectionDescription")}
          </Text>
        </VStack>
        <Box
          display={{ base: "none", sm: "block" }}
          pos="relative"
          w="100%"
          _after={{
            content: '""',
            pos: "absolute",
            top: 0,
            left: 0,
            borderRadius: "20px 0 20px 0",
            bg: "transparent",
            border: "1px solid",
            borderColor: "brand.primary.300",
            transform: "translateX(2%) translateY(2%)",
            w: "100%",
            zIndex: 1000,
            h: "100%",
          }}
        >
          <Image
            aspectRatio={584 / 389}
            src={aboutImg.src}
            w="100%"
            h="100%"
            style={{ borderRadius: "0 20px 0 20px", zIndex: "100" }}
            alt={getAlternativeText()}
          />
        </Box>
      </SimpleGrid>
    </VStack>
  );
}
