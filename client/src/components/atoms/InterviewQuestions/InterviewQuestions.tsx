"use client";
import { ReactNode, useState } from "react";
import { LSIconDownOutline } from "../Icons/Icons";
import Image from "../NextImageWrapper/Image";
import VStack from "@/components/ui/VStack";

export default function InterviewQuestions({
  title,
  basicQstns,
  expandQstns,
  image,
}: {
  title: string;
  basicQstns: ReactNode;
  expandQstns: ReactNode | null | undefined;
  image: any;
}) {
  const [isExpand, setExpand] = useState(false);
  return (
    <VStack className="w-full gap-[0] items-center">
      <div className="grid grid-cols-1 md:grid-cols-[15rem_auto] w-full bg-[#c6b299] items-center rounded-[30px_0_0_0] overflow-hidden p-[1rem] sm:p-0">
        <Image
          src={image}
          parentClass="w-[15rem] aspect-[1.5/1] hidden md:block"
          alt="Hiring tips by pickmymaid"
        />
        <h3 className="heading-primary font-[500] text-[#fff] text-center">
          {title}
        </h3>
      </div>
      <div className="w-[100%] p-[1rem] md:p-[2rem] leading-[22px] sm:leading-[30px] border-[1px] border-primary-400 rounder-[0px_0px_30px_0px] border-t-0">
        <p className="text-description">{basicQstns}</p>
        {expandQstns && (
          <>
            {/* Expandable content */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isExpand ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-description">{expandQstns}</p>
            </div>

            {/* Toggle Button */}
            <div className="w-full flex justify-center pt-4">
              <button
                onClick={() => setExpand((prev) => !prev)}
                className="text-sm font-medium text-orange-500 hover:underline flex items-center gap-2"
              >
                {isExpand ? "Show less" : "Read more"}
                <LSIconDownOutline
                  style={{
                    transform: isExpand ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.3s ease",
                    color: "#FF7442",
                  }}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </VStack>
  );
}
