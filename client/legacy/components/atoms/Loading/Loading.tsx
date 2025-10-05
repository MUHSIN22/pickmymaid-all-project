"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

export default function Loading({ text }: { text?: string }) {
  const { t } = useTranslation();
  return (
    <Center
      w="100%"
      h="100vh"
      pos="fixed"
      top={0}
      left={0}
      bg="rgba(0,0,0,0.7)"
      zIndex="99999"
      p={4}>
      <VStack>
        <Spinner
          size="xl"
          color="white"
        />
        <Text
          variant="subTitle"
          color="white">
          {text || "Loading..."}
        </Text>
      </VStack>
    </Center>
  );
}
