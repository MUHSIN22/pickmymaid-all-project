"use client";
import { AspectRatio, Skeleton } from "@chakra-ui/react";

export default function BlogCardSkeleton() {
  return (
    <AspectRatio ratio={1 / 1.1} w="100%">
      <Skeleton w="100%" h="100%" borderRadius="10px" />
    </AspectRatio>
  );
}
