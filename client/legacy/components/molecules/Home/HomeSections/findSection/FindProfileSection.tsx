"use client";
import {
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { profileCategories } from "./FindProfileSection.data";
import { getAlternativeText } from "@/utils/altSelector";
import { commonPadding } from "@/components/atoms/styles";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import Image from "@/components/atoms/NextImageWrapper/Image";

export default function FindProfileSection({
  campaign,
}: {
  campaign: boolean;
}) {
  const { t } = useTranslation();

  const [sortedCount, setSortedCount] = useState<{ [key: string]: any } | null>(
    null
  );

  const router = useRouter();

  const profileCount = useAppSelector(
    (state) => state?.maid?.counts?.serviceCounts
  );

  useEffect(() => {
    if (profileCount) {
      const sorted = {};
      for (let i = 0; i < profileCount.length; i++) {
        const item = profileCount[i];
        sorted[item?.id] = item.count;
      }
      setSortedCount(sorted);
    }
  }, [profileCount]);

  return (
    <VStack
      w="100%"
      alignItems="center"
      sx={commonPadding}
      gap={{ base: 5, sm: 10, md: 15 }}
      minW="100%"
      minH="5rem"
    >
      {!campaign && (
        <VStack textAlign="center">
          <Heading as="h2" variant="sectionTitle">
            {t("home.findProfile.heading")}{" "}
            <Box as="span" color="brand.primary.300">
              {t("home.findProfile.profileCount")}
            </Box>
          </Heading>
          <Text variant="description">{t("home.findProfile.subTitle")}</Text>
        </VStack>
      )}
      <SimpleGrid
        gap={{ base: 3, sm: "3rem", "2xl": "5rem" }}
        columns={{ base: 4, md: 8 }}
      >
        {profileCategories.map((category) => (
          <VStack
            key={category.id}
            cursor="pointer"
            onClick={() => router.push(`/search?service=${category.numberKey}`)}
            textAlign="center"
          >
            <AspectRatio w="100%" ratio={1 / 1}>
              <Box borderRadius="50%" w="100%" h="100%">
                <Image
                  src={category.image.src}
                  aspectRatio={1 / 1}
                  w="100%"
                  h="auto"
                  alt={getAlternativeText()} // Pass proper alt text here
                />
              </Box>
            </AspectRatio>
            <Heading fontSize={{ base: "0.8rem", sm: "1rem" }} fontWeight={500}>
              {t(category.category)}
            </Heading>
            {sortedCount && (
              <Text
                fontSize={{ base: "0.7rem", sm: "0.9rem", md: "1rem" }}
                color="brand.primary.300"
              >
                {sortedCount?.[category.numberKey] || 0}{" "}
                {t("home.findProfile.profile")}{" "}
              </Text>
            )}
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
