"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

type SwiperSliderProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  swiperProps?: SwiperProps;
  autoplay?: boolean;
  spaceBetween?: number;
  slidesPerView?: number;
  breakpoints?: any;
};

export default function SwiperSlider<T>({
  items,
  renderItem,
  swiperProps = {},
  autoplay = false,
  spaceBetween,
  slidesPerView,
  breakpoints
}: SwiperSliderProps<T>) {
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    if (autoplay) {
      setModules((prev) => {
        prev.push(Autoplay);
        return prev;
      });
    }
  }, [autoplay]);
  return (
    <div className="w-full relative">
      <Swiper
        modules={modules}
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: true,
              }
            : false
        }
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        {...swiperProps}
      >
        {items?.map((item, index) => (
          <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
