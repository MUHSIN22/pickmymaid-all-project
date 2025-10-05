"use client";

import Image from "@/components/atoms/NextImageWrapper/Image";
import {
  Heading,
  VStack,
  Image as ChakraImage,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import khaleej from "@/assets/images/Home/khaleej.webp";
import { useRouter } from "next/navigation";

export default function NewsSection() {
  const router = useRouter();
  const imageWidth = useBreakpointValue({ base: "10rem", md: "25rem" });

  const handleNavigate = () => {
    router.push(
      "https://www.khaleejtimes.com/kt-network/5900-maids-find-employment-through-pickmymaid"
    );
  };
  return (
    <VStack
      bg="#34A0E1"
      alignItems="center"
      justifyContent="flex-start"
      p="1rem"
      py="0.5rem"
      onClick={handleNavigate}
      cursor="pointer"
      w="100%"
    >
      <Heading variant="card" color="#fff" px="0.8rem">
        Featured in:
      </Heading>
      <Image
        style={{ cursor: "pointer" }}
        src={khaleej.src}
        alt="khaleej_times_news"
        aspectRatio={880 / 166}
        w={imageWidth}
      />
    </VStack>
  );
}
