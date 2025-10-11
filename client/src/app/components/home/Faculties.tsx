import React from "react";
import SwiperSlider from "../UI/SwiperSlider";
import FacultyCard from "../UI/FacultyCard";
import cards from "./mentors.json";

export default function Faculties() {
  return (
    <div className="flex justify-center w-[100%] scroll-mt-30" id="faculties">
      <div className="common-x-spacing flex flex-col items-center gap-[2rem] md:gap-[4rem] w-[100%]">
        <div className="flex flex-col items-center justify-center gap-[1rem] text-center">
          <h2 className="heading text-dark font-[700]">
            Learn from the Best Minds in Medicine
          </h2>
          <p className="caption text-gray font-[500] max-w-[55rem]">
            Our faculty members are more than teachers—they are mentors who
            inspire, motivate, and guide you to achieve your dream seat
          </p>
        </div>

        <SwiperSlider
          items={cards}
          renderItem={(card, index) => (
            <FacultyCard
              key={card.id}
              subject={card.specialization}
              name={card.name}
              // description={card.description}
              image={card.image}
            />
          )}
          autoplay
          spaceBetween={40}
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
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
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
        />
      </div>
    </div>
  );
}
