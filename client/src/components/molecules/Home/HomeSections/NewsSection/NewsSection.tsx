"use client";
import Image from "@/components/atoms/NextImageWrapper/Image";
import React from "react";
import khaleej from "@/assets/images/Home/Khaleej_Times_latest_quality.webp";
import { useRouter } from "next/navigation";
import VStack from "@/components/ui/VStack";
import Link from "next/link";

export default function NewsSection() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 500;
  const router = useRouter();

  const handleNavigate = () => {
    router.push(
      "https://www.khaleejtimes.com/kt-network/5900-maids-find-employment-through-pickmymaid"
    );
  };
  return (
    <Link
      className="flex bg-soft-gray flex-col gap-[2rem] items-center justify-start p-[1rem] z-[10] relative py-[0.5rem] cursor-pointer w-[100%]"
      href="https://www.khaleejtimes.com/kt-network/5900-maids-find-employment-through-pickmymaid"
    >
      <h2 className="text-[1.2rem] font-[500] italic text-center px-[0.8rem]">
        "5,900 maids find employment through Pickmymaid"
      </h2>
      <Image
        src={khaleej.src}
        alt="khaleej_times_news"
        parentClass="cursor-pointer aspect-[171/52] w-[50%] sm:w-[20rem]"
      />
    </Link>
  );
}
