"use client";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { Suspense, useEffect, useState } from "react";
import { Autoplay } from "swiper";

import { useTranslation } from "@/lib/hooks/useTranslation";

import { commonPadding } from "@/components/atoms/styles";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./FeaturedMaids.css";

import CountryButtonWrapper from "@/components/atoms/CountryButtonWrapper/CountryButtonWrapper";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchFeaturedMaids } from "@/lib/features/maid/maidAction";
import MaidCardSkeleton from "@/components/atoms/Skeletons/MaidCardSkeleton/MaidCardSkeleton";

import MaidCard from "@/components/atoms/Cards/MaidCard/MaidCard";
import { useRouter } from "next/navigation";

export default function FeaturedMaids() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [hide, setHide] = useState<boolean>(false);

  const { featuredMaid: featuredMaids, counts } = useAppSelector(
    (state) => state?.maid
  );

  useEffect(() => {
    dispatch(fetchFeaturedMaids(null));
  }, []);

  useEffect(() => {
    setHide(true);
    const timeout = setTimeout(() => {
      setHide(false);
    }, 500);
    console.log(i18n.dir());
    return () => {
      clearTimeout(timeout);
      setHide(false);
    };
  }, [i18n.dir()]);

  return (
    <VStack w="100%" gap={{ base: 2, sm: 10 }} bg="#fff" sx={commonPadding}>
      <VStack>
        <Heading as="h2" variant="sectionTitle">
          {t("home.featured.heading")}
        </Heading>
        <HStack gap="3px">
          {counts?.totalCounts
            .toString()
            ?.split("")
            .map((number, index) => (
              <AspectRatio
                ratio={1 / 1}
                w="2rem"
                key={index}
                bg="brand.primary.300"
                borderRadius="2px"
              >
                <Heading variant="tertiary" color="white" fontWeight={500}>
                  {number}
                </Heading>
              </AspectRatio>
            ))}
        </HStack>
      </VStack>
      <Box
        w="100%"
        bg="soft.gray"
        py={{ base: 2, sm: 8 }}
        px={{ base: 2, sm: 6, md: 10 }}
        rounded="xl"
      >
        <CountryButtonWrapper />

        <Flex py="1rem" flexDir="column" alignItems="center" p="0.5rem">
          <Text variant="subTitle" color="brand.primary.300" fontWeight="600">
            New Profiles
          </Text>
          <Text
            mx="auto"
            variant="description"
            fontWeight={500}
            textAlign="center"
          >
            Updated on{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </Flex>

        {!hide && (
          <Box pos="relative">
            <Swiper
              slidesPerView={4}
              spaceBetween={40}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              modules={[Autoplay]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                769: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
            >
              {featuredMaids &&
                featuredMaids?.map((maid) => (
                  <SwiperSlide>
                    <Suspense fallback={<MaidCardSkeleton />}>
                      <MaidCard
                        refNumber={maid.refNumber}
                        name={maid.name}
                        nationality={maid.nationality}
                        profile={maid.profile}
                        experience={maid.experience}
                        option={maid.option}
                        references={maid.reference}
                        salary={maid.salary}
                        availability={!maid.hired}
                        id={maid.id}
                        postedDate={maid.postedDate}
                        service={maid.service}
                        youtubeLink={maid.youtubeLink}
                        isInWishlist={maid.isInWishlist}
                      />
                    </Suspense>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Box>
        )}

        <HStack w="100%" justifyContent="center" mt={{ base: 8 }}>
          <Button variant="solid" onClick={() => router.push("/search")}>
            {t("common.button.viewMore")}
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
}
