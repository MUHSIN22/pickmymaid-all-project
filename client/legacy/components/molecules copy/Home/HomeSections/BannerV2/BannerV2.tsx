"use client";

import {
  Box,
  Flex,
  Grid,
  Heading,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import PrimaryInput from "@/components/atoms/InputFields/PrimaryInput/PrimaryInput";
import { useForm } from "react-hook-form";
import { commonPadding } from "@/components/atoms/styles";
import bannerImg from "@/assets/images/Home/banner-v2.png";
import { useEffect, useState } from "react";
import Trans from "@/components/atoms/Trans/Trans";
import maidImg from "@/assets/images/Home/maid in dubai.webp";
import Image from "@/components/atoms/NextImageWrapper/Image";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";
import { BiSearch } from "@/components/atoms/Icons/Icons";

const list: string[] = [
  "Muslim",
  "Part Time",
  "UAE",
  "Dubai",
  "Filipino",
  "Indonesian",
  "Srilankan",
  "Nepali",
  "Malayalam",
  "Arabic",
  "Maid cum Nanny",
  "Maid",
  "Nanny",
  "Cleaning",
  "Cooking",
  "Live-in",
  "Live-out",
  "English",
  "Caregiver",
  "Driver",
  "Private Tutor",
  "Private Nurse",
  "Postpartum care",
  "Cook",
];

export default function BannerV2() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({ mode: "onChange" });

  const [filteredList, setFilteredList] = useState<string[]>(list || []);

  const onSearch = (data) => {
    if (data?.search !== "") {
      router.push(`/search?searchParams=${data.search}`);
    }
  };

  const handleSuggestionClick = (value) => {
    router.push(`/search?searchParams=${value}`);
  };

  useEffect(() => {
    if (watch("search") === "") {
      setFilteredList(list);
    } else if (watch("search")) {
      setFilteredList(
        list.filter((item) =>
          item.toLowerCase().includes(watch("search")?.toLowerCase())
        )
      );
    }
  }, [watch("search")]);

  return (
    <Box
      h={{ base: "max-content" }}
      w="100%"
      sx={commonPadding}
      py={{ base: 2, md: 8 }}
      pb={{ base: 6 }}
      bg={{ base: "soft.gray", sm: "white" }}
      backgroundImage={{ base: `url('${maidImg.src}')`, sm: "none" }}
      backgroundSize="contain"
      bgRepeat="no-repeat"
      bgPos="left bottom"
      minH={{ base: "23rem", sm: "auto" }}
    >
      <Grid
        templateColumns={{ base: "1fr", lg: "1.5fr 1fr" }}
        gap="10%"
        h={{ base: "23rem", sm: "auto" }}
      >
        <VStack
          alignItems="flex-start"
          justifyContent={{ base: "space-between", sm: "center" }}
          h="100%"
          pos="static"
          zIndex={20}
          flexShrink={2}
          gap={{ base: "0.5rem", sm: "1rem" }}
          textAlign={{
            base: i18n.dir() === "ltr" ? "left" : "right",
          }}
        >
          <VStack
            gap="0.5rem"
            alignItems={{ base: "center", sm: "flex-start" }}
            textAlign={{ base: "center", sm: "left" }}
          >
            <Heading
              as="h1"
              minH="2rem"
              color="text.black.900"
              variant="primary"
              w="100%"
              fontWeight={{ base: 800 }}
              maxW="45rem"
            >
              Are you looking for a Maid or Nanny in UAE?
            </Heading>
            <Text color="text.black.900" maxH="max-content">
              Register now, and save additional charges that you spend on
              agencies.
              <br />
              <br />
            </Text>
          </VStack>

          <Flex
            w="100%"
            maxW="35rem"
            gap={{ base: "0.5rem", sm: "1rem" }}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <PrimaryInput
              register={register("search")}
              placeholder="Search by type eg. Cook Cleaning"
              errorMessage={errors.search?.message as string}
              isList={filteredList}
              bg="white"
              handleSuggestionClick={handleSuggestionClick}
            />

            <CustomButton
              variant="solid"
              zIndex={1}
              py="0.5rem"
              fontWeight={500}
              leftIcon={<BiSearch />}
              onClick={handleSubmit(onSearch)}
            >
              Search
            </CustomButton>
          </Flex>
        </VStack>
        <Show above="lg">
          <Image
            src={bannerImg.src}
            aspectRatio={741 / 753}
            w="100%"
            alt="Quality Maids in Pickmymaid"
            noLazy
          />
        </Show>
      </Grid>
    </Box>
  );
}
