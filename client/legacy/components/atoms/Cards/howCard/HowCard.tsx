"use client";
import { Flex, Text, Heading, Box } from "@chakra-ui/react";
import { getAlternativeText } from "@/utils/altSelector";
import Image from "../../../../../src/components/atoms/NextImageWrapper/Image";

export default function HowCard({ image, number, head, para }: any) {
  return (
    <Flex
      bg="white"
      pos="relative"
      w="100%"
      borderRadius="35px 0px 35px 0"
      h={["23rem", "24rem", "28rem", "25rem", "25rem"]}
      border="0.88px solid #FF8F5F"
      p="1rem"
    >
      <Box
        left={{ base: "0", md: "0.1rem", lg: "1rem", xl: "0" }}
        top="1rem"
        objectFit="contain"
        pos="absolute"
        w={{ base: "5rem", md: "3rem", xl: "5rem" }}
        h={{ base: "11rem", md: "8rem", xl: "11rem" }}
      >
        <Image
          src={number}
          alt={getAlternativeText()}
          w="100%"
          h="100%"
          aspectRatio={5 / 11}
        />
      </Box>

      <Flex direction="column" gap="1rem" align="center" mt="5" w="100%">
        {image && (
          <Box
            w={["13rem", "13rem", "13rem", "9rem", "13rem"]}
            h={["12rem", "12rem", "12rem", "10rem", "12rem"]}
            objectFit="contain"
          >
            <Image
              src={image}
              alt={getAlternativeText()}
              w="100%"
              h="auto"
              aspectRatio={4 / 3}
            />
          </Box>
        )}

        <Flex direction="column">
          <Heading variant="smaller">{head}</Heading>
          <Text variant="description">{para}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
