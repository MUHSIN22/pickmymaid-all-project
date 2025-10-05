"use client";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { commonPadding } from "@/components/atoms/styles";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { HomeVideoIframe } from "@/components/atoms/HomeVideoIframe/HomeVideoIframe";

export default function LastCTASection() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box sx={commonPadding} w="100%">
      <Flex
        alignItems="center"
        flexDir={{ base: "column-reverse", md: "row" }}
        gap={{ base: 8, md: "10%" }}
        bg="brand.primary.50"
        p={{ base: 4, sm: 8 }}
        rounded="2xl"
      >
        <VStack alignItems="left" gap={4}>
          <Heading as="h2" variant="secondary">
            {t("home.CTA.heading")}
          </Heading>
          <Text variant="description">{t("home.CTA.subHeading")}</Text>
          <Button
            variant="solid"
            w="max-content"
            onClick={() => router.push("/search")}
          >
            {t("common.button.vmMaids")}
          </Button>
        </VStack>
        {/* <Image
          src={stripeCicleImage}
          alt='Pickmymaid maids'
          w={{ base: '80%', sm: '40%' }}
        /> */}
        <AspectRatio
          ratio={5 / 3}
          w={{ base: "100%", xl: "40rem" }}
          rounded="xl"
          overflow="hidden"
        >
          <Suspense
            fallback={<Skeleton w="100%" height="100%" borderRadius="13px" />}
          >
            <HomeVideoIframe />
          </Suspense>
        </AspectRatio>
      </Flex>
    </Box>
  );
}
