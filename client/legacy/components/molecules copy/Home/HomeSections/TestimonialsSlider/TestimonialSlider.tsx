"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { AspectRatio, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { reviews } from "@/components/molecules/Home/HomeSections/TestimonialsSlider/reviews.data";
import ReviewCard from "@/components/atoms/Cards/ReviewCard/ReviewCard";
import { commonPadding } from "@/components/atoms/styles";
import googleImage from "@/assets/images/4 star review.png";
import "./TestimonialSlider.css";
import Image from "@/components/atoms/NextImageWrapper/Image";

export default function TestimonialSlider() {
  return (
    <VStack w="100%" gap={{ base: 2, sm: 10 }} sx={commonPadding}>
      <VStack>
        <Heading as="h2" variant="sectionTitle">
          Testimonial from our users
        </Heading>
        <Text
          variant="subTitle"
          color="black"
          textTransform="unset"
          textAlign="center"
        >
          Register Now - Get Access to 1500+ Maids profiles who're ready join
        </Text>
        <AspectRatio
          ratio={1300 / 415}
          w={{ base: "8rem", md: "9rem" }}
          pos={{ base: "relative" }}
        >
          <Image
            src={googleImage.src}
            alt="5 Star review of pickmymaid"
            aspectRatio={3 / 1}
            w="100%"
            h="100%"
          />
        </AspectRatio>
      </VStack>
      <Box w="100%" pos="relative">
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
              spaceBetween: 20,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            769: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard
                text={review.text}
                name={review.name}
                title={review.type}
                image={review?.image}
                key={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </VStack>
  );
}
