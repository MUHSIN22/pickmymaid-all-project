"use client";
import { reviews } from "@/components/molecules/Home/HomeSections/TestimonialsSlider/reviews.data";
import ReviewCard from "@/components/atoms/Cards/ReviewCard/ReviewCard";
import googleImage from "@/assets/images/4 star review.png";
import "./TestimonialSlider.css";
import Image from "@/components/atoms/NextImageWrapper/Image";
import VStack from "@/components/ui/VStack";
import SwiperSlider from "@/components/atoms/SwiperSlider/SwiperSliderComp";

export default function TestimonialSlider() {
  return (
    <VStack className="w-full gap-[2] sm:gap-[10] common-padding">
      <VStack className="items-center">
        <h2 className="heading-section-title">Testimonial from our users</h2>
        <p className="text-sub-title text-black text-unset text-center">
          Register Now - Get Access to 1500+ Maids profiles who're ready join
        </p>
        <div className="aspect-[1300/415] w-[8rem] md:w-[9rem] relative">
          <Image
            src={googleImage.src}
            alt="5 Star review of pickmymaid"
            parentClass="aspect-[3/1] w-[100%] h-[100%]"
          />
        </div>
      </VStack>
      <SwiperSlider
        items={reviews}
        renderItem={(review, index) => (
          <ReviewCard
            key={index}
            text={review.text}
            name={review.name}
            title={review.type}
            image={review.image}
          />
        )}
        autoplay
        spaceBetween={40}
        slidesPerView={4}
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
          1500: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      />
    </VStack>
  );
}
