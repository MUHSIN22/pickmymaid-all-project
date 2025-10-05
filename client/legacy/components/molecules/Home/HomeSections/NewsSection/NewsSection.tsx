"use client";
import Image from "@/components/atoms/NextImageWrapper/Image";
import React from "react";
import khaleej from "@/assets/images/Home/khaleej.webp";
import { useRouter } from "next/navigation";
import VStack from "@/components/ui/VStack";

export default function NewsSection() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 500;
  const router = useRouter();

  const handleNavigate = () => {
    router.push(
      "https://www.khaleejtimes.com/kt-network/5900-maids-find-employment-through-pickmymaid"
    );
  };
  return (
    <VStack
      className="bg-[#34A0E1] items-center justify-start p-[1rem] z-[10] relative py-[0.5rem] cursor-pointer w-[100%]"
      onClick={handleNavigate}
    >
      <h2 className="heading-card text-white px-[0.8rem]">Featured in:</h2>
      <Image
        src={khaleej.src}
        alt="khaleej_times_news"
        parentClass="cursor-pointer aspect-[880/166] w-[50%] sm:w-[20rem]"
      />
    </VStack>
  );
}
