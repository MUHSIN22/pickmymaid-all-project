import { Box, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import teamDetails from "./MeetTheTeam.data";
import { useEffect, useRef } from "react";
import SwiperCore from "swiper";
import { useParams, useRouter } from "next/navigation";
import { commonPadding } from "@/components/atoms/styles";
import { RoundCall } from "@/components/atoms/Icons/Icons";
import TeamCard from "@/components/atoms/TeamCard/TeamCard";
import 'swiper/css';
import "./MeetTheTeam.css";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";

export default function MeetTheTeam() {
  const router = useRouter();
  const { locale } = useParams();

  const sectionRef = useRef(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          swiperRef.current?.autoplay?.start();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (swiperRef?.current) {
      swiperRef.current?.autoplay?.stop();
      swiperRef.current.autoplay.running = false;
      swiperRef.current.autoplay.pause = true;
    }
  }, []);
  return (
    <VStack
      sx={commonPadding}
      pos="relative"
      w="100%"
      pt="2rem"
      gap={{ base: "3rem" }}>
      <Box
        w="100%"
        height="50%"
        pos="absolute"
        top={0}
        left={0}
        bg="#ececec"></Box>
      <VStack
        textAlign="center"
        gap="2rem">
        <Heading
          as="h1"
          variant="sectionTitle"
          className="header-line-right">
          Meet Our HR Team
        </Heading>
        <Text
          variant="description"
          fontSize={{ base: "0.9rem", sm: "1.1rem" }}
          maxW="50rem"
          zIndex={100}>
          Get help 24/7, dedicated to build a supportive, skilled and trusted workforce to serve your home with care and professionalism
        </Text>
      </VStack>
      <HStack>
        <CustomButton
          bg="white"
          color="#000"
          fontSize="12px"
          fontWeight={500}
          padding="2px 18px !important"
          borderRadius="50px"
          border="1px solid rgba(0,0,0,1)"
          w="max-content"
          _hover={{
            bg: "white",
            borderColor: "brand.primary.400",
            color: "brand.primary.400",
          }}
          onClick={() => window.open("tel:+971566369736")}
          leftIcon={<RoundCall />}>
          Book a call
        </CustomButton>
        <CustomButton
          bg="white"
          color="#000"
          fontSize="12px"
          fontWeight={500}
          padding="2px 18px !important"
          borderRadius="50px"
          border="1px solid rgba(0,0,0,1)"
          w="max-content"
          onClick={() => router.push(`/${locale ?? 'en'}/contact-us`)}
          _hover={{
            bg: "white",
            borderColor: "brand.primary.400",
            color: "brand.primary.400",
          }}>
          Get in touch
        </CustomButton>
      </HStack>
      <Box
        w="100%"
        pos="relative"
        ref={sectionRef}>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={4}
          spaceBetween={40}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
            waitForTransition: true,
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
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}>
          {teamDetails.map((details, index) => (
            <SwiperSlide key={index}>
              <TeamCard {...details} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </VStack>
  );
}
