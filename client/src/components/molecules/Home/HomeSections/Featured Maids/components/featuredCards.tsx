"use client";

import MaidCard from "@/components/atoms/Cards/MaidCard/MaidCard";
import SwiperSlider from "@/components/atoms/SwiperSlider/SwiperSliderComp";
import React from "react";
import { IFeaturedMaidCard } from "@/types/features/maid/maid.types";

const featuredCards = ({
  featuredMaids,
}: {
  featuredMaids: IFeaturedMaidCard[];
}) => {
  return (
    <div className="relative">
      <SwiperSlider
        items={featuredMaids as IFeaturedMaidCard[]}
        renderItem={(maid: any) => (
          <MaidCard
            refNumber={maid.refNumber || maid?.ref_number}
            name={maid.name}
            nationality={maid.nationality}
            profile={maid.profile}
            experience={maid.experience}
            option={maid.option}
            references={maid.reference}
            salary={maid.salary}
            availability={!maid.hired}
            id={maid.id}
            postedDate={maid.postedDate || maid.date}
            service={maid.service}
            youtubeLink={maid.youtubeLink}
            isInWishlist={maid.isInWishlist}
          />
        )}
        autoplay
        spaceBetween={40}
        slidesPerView={4}
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
      />
    </div>
  );
};

export default featuredCards;
