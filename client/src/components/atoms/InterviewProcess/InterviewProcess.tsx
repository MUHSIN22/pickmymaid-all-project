"use client";

import clsx from "clsx";
import Image from "../NextImageWrapper/Image";
import VStack from "@/components/ui/VStack";
import HStack from "@/components/ui/HStack";

export default function InterviewProcess({
  index,
  heading,
  description,
  icon,
}: {
  index: number;
  heading: String;
  description: String;
  icon: any;
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-[2rem] p-[0_1.5rem] max-w-[70rem]",
        index % 2 !== 0
          ? "sm:grid-cols-[auto_8rem] border-l-[1px] border-black"
          : "sm:grid-cols-[8rem_auto] border-r-[1px] border-black"
      )}
    >
      {index % 2 === 0 && (
        <div className="hidden sm:block">
          <div className="bg-primary-50 rounded-[30px] p-[1rem] w-[100%] h-[100%] flex items-center">
            <Image
              src={icon.src}
              parentClass="aspect-[1/1] w-[100%]"
              className="object-contain"
              alt="Hiring tips by pickmymaid"
            />
          </div>
        </div>
      )}
      <VStack className="items-start">
        <HStack
          className={clsx(
            "gap-[0.5rem] gap-[1.5rem] items-end w-[100%]",
            index % 2 !== 0
              ? "justify-start flex-row"
              : "justify-[end] flex-row-reverse"
          )}
        >
          <h3 className="text-[2rem] md:text-[4rem] leading-[normal] text-primary-300 font-[500]">
            0{index}
          </h3>
          <h3 className="heading-secondary font-[500]">{heading}</h3>
        </HStack>
        <p className="text-description bg-[#f2f6fd] p-[1rem] rounded-[8px] max-w-[55rem] text-left">
          {description}
        </p>
      </VStack>
      {index % 2 !== 0 && (
        <div className="hidden sm:block">
          <div className="bg-primary-50 rounded-[30px] h-[100%] p-[1rem] w-[100%] flex items-center">
            <Image
              src={icon.src}
              parentClass="aspect-[1/1] w-[100%]"
              className="object-contain"
              alt="Hiring tips by pickmymaid"
            />
          </div>
        </div>
      )}
    </div>
  );
}
