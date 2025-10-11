'use client';

import dynamic from "next/dynamic";

const TestimonialSlider = dynamic(
    () =>
      import(
        "@/components/molecules/Home/HomeSections/TestimonialsSlider/TestimonialSlider"
      ),
    {
      ssr: false,
    }
  );
  
export default function TestimonialSliderWrapper() {
  return <TestimonialSlider />;
}