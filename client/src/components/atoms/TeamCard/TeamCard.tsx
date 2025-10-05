"use client";

import Image from "next/image";
import { ReactNode } from "react";

export default function TeamCard({
  name,
  details,
  image,
}: {
  name: string;
  details: ReactNode;
  image: string;
}) {
  return (
    <div className="w-full p-2 sm:p-4 border border-black rounded-2xl bg-white flex flex-col h-full">
      {/* Image with fixed aspect ratio */}
      <div className="w-full aspect-[4/3] relative shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Text */}
      <div className="bg-[#ececec] w-full p-4 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl  text-center heading-smaller leading-snug">
          {name}
        </h3>
        <p className="text-sm sm:text-base text-description  pt-3 text-center leading-relaxed">
          {details}
        </p>
      </div>
    </div>
  );
}
