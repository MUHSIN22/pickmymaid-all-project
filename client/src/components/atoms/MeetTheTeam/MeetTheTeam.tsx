"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import { Autoplay } from "swiper/modules";
import { useParams, useRouter } from "next/navigation";
import { RoundCall } from "@/components/atoms/Icons/Icons";
import TeamCard from "@/components/atoms/TeamCard/TeamCard";
import teamDetails from "./MeetTheTeam.data";
import "swiper/css";
import "./MeetTheTeam.css";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";

export default function MeetTheTeam() {
  const router = useRouter();
  const { locale } = useParams();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          swiperRef.current?.autoplay?.start();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    swiperRef.current?.autoplay?.stop();
  }, []);

  return (
    <div className="relative w-full pt-8 flex flex-col gap-12 px-4 md:px-8 lg:px-16">
      {/* Background Block */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#ececec]" />

      {/* Heading */}
      <div className="flex flex-col items-center text-center gap-8 z-10">
        <h1 className="header-line-right font-bold text-2xl md:text-4xl">
          Meet Our HR Team
        </h1>
        <p className="text-sm sm:text-base max-w-3xl z-10 text-gray-800">
          Get help 24/7, dedicated to build a supportive, skilled and trusted
          workforce to serve your home with care and professionalism
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row gap-4 justify-center z-10">
        <CustomButton
          containerClassName="!bg-white !text-black !text-[12px] !font-medium !px-[20px] !py-[0.5rem] !rounded-[50px] !border !border-black"
          _hover={{
            bg: "white",
            borderColor: "brand.primary.400",
            color: "brand.primary.400",
          }}
          onClick={() => window.open("tel:+971566369736")}
          leftIcon={<RoundCall />}
        >
          Book a call
        </CustomButton>
        <CustomButton
          containerClassName="!bg-white !text-black !text-[12px] !font-medium !px-[18px] !py-[2px] !rounded-[50px] !border !border-black"
          onClick={() => router.push(`/${locale ?? "en"}/contact-us`)}
          _hover={{
            bg: "white",
            borderColor: "brand.primary.400",
            color: "brand.primary.400",
          }}
        >
          Get in touch
        </CustomButton>
      </div>

      {/* Swiper Carousel */}
      <div className="relative w-full" ref={sectionRef}>
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
            0: { slidesPerView: 1, spaceBetween: 20 },
            576: { slidesPerView: 2, spaceBetween: 30 },
            769: { slidesPerView: 3, spaceBetween: 20 },
            900: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 30 },
          }}
        >
          {teamDetails.map((details, index) => (
            <SwiperSlide key={index}>
              <TeamCard {...details} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
