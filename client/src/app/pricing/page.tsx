import { Metadata } from "next";
import React from "react";
import securedPayment from "@/assets/images/secure_payment.png";
import { pricingData } from "./pricingData";
import PriceCardWrapper from "@/components/atoms/Cards/RevampedPricingCard/PriceCardWrapper";
import Image from "@/components/atoms/NextImageWrapper/Image";
import MeetTheTeam from "@/components/atoms/MeetTheTeam/MeetTheTeam";
import TestimonialSliderWrapper from "@/components/molecules/Home/HomeSections/Wrappers/TestimonialSliderWrapper";

export const metadata: Metadata = {
  title: "Explore Our Subscription Plans | Choose the Right One for You",
  description:
    "Discover our subscription plans tailored to your needs. Find the perfect option to unlock exclusive benefits and services from PickMyMaid",
};
export default function page() {
  return (
    <div className="bg-[#dfdddd75] py-[1rem] flex flex-col gap-[4rem]">
      <div>
        <div className="relative">
          <div className="flex common-padding flex-col justify-center items-center min-h-[10rem] md:min-h-[15rem] lg:min-h-[40vh]">
            <h1 className="heading-section-title max-w-[35rem] text-center">
              Access Plans
            </h1>
            <p className="text-subtitle text-center">
              One time payment with No hidden changes - No automatic renewals.
            </p>
            <Image
              src={securedPayment.src}
              parentClass="aspect-[4/1] w-[20rem] sm:w-[30rem]"
              alt="accepted payments"
            />
          </div>
        </div>
        <div className="flex pb-8 mt-[1rem] gap-[2.5rem] sm:gap-[4rem] flex-col justify-center items-center">
          <div className="flex items-stretch justify-center flex-wrap sm:flex-nowrap gap-4 md:gap-10 common-padding w-[100%] sm:w-auto">
            {pricingData.map((item) => (
              <PriceCardWrapper data={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
      <MeetTheTeam />
      <TestimonialSliderWrapper />
    </div>
  );
}
