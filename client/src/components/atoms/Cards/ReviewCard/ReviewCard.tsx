"use client";
import VStack from "@/components/ui/VStack";
import { Star } from "../../../../../legacy/components/atoms/Icons/Icons";
import HStack from "@/components/ui/HStack";
import type { StaticImageData } from "next/image";

type ReviewCardProps = {
  text: string;
  name: string;
  title?: string;
  image: string | StaticImageData | { src: string };
};

export default function ReviewCard({ text, name, image, title }: ReviewCardProps) {
  const imageSrc = typeof image === "string" ? image : image?.src ?? "";

  return (
    <VStack className="w-full h-full rounded-[5px] gap-[3rem] items-start justify-between p-[2rem] bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.1)] user-select-none">
      <VStack className="items-start">
        <HStack>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="aspect-[1/1] w-[1.5rem]">
              <Star key={index} />
            </div>
          ))}
        </HStack>
        <p className="text-description text-black">{text}</p>
      </VStack>
      <HStack className="justify-between w-full mt-auto">
        <VStack className="gap-0 items-start">
          <p className="text-description text-black font-[600]">{name}</p>
          <p className="text-description">{title}</p>
        </VStack>
        <div className="aspect-[1/1] w-[3rem] h-[3rem] rounded-full overflow-hidden">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </HStack>
    </VStack>
  );
}
