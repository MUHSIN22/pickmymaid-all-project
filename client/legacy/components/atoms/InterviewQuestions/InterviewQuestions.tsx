"use client";
import {
  Box,
  Button,
  Collapse,
  Grid,
  HStack,
  Heading,
  Hide,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { LSIconDownOutline } from "../Icons/Icons";
import { regularFont } from "../styles";
import Image from "../../../../src/components/atoms/NextImageWrapper/Image";
import { getAlternativeText } from "@/utils/altSelector";
import CustomButton from "../CustomButton/CustomButton";

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
    <VStack w="100%" gap={0}>
      <Grid
        templateColumns={{ base: "1fr", sm: "15rem auto" }}
        w="100%"
        bg="#c6b299"
        alignItems="center"
        borderRadius="30px 0 0 0"
        overflow="hidden"
        padding={{ base: "1rem", sm: 0 }}
      >
        <Hide below="sm">
          <Image
            aspectRatio={1.5 / 1}
            w="15rem"
            alt={getAlternativeText()}
            src={image}
          />
        </Hide>
        <Heading
          variant="Primary"
          fontWeight={500}
          textAlign="center"
          color="#fff"
        >
          {" "}
          {title}
        </Heading>
      </Grid>
      <Box
        w="100%"
        padding={{ base: "1rem", md: "2rem" }}
        lineHeight={{ base: "22px", sm: "30px" }}
        border="1px solid"
        borderColor="brand.primary.400"
        borderRadius="0px 0px 30px 0px"
        borderTop="none"
      >
        <Text variant="description">{basicQstns}</Text>
        {expandQstns && (
          <>
            <Collapse in={isExpand}>
              <Text variant="description">{expandQstns}</Text>
            </Collapse>
            <HStack w="100%" justifyContent="center" pt="1rem">
              <CustomButton
                variant="ghost"
                onClick={() => setExpand((prev) => !prev)}
                sx={regularFont}
                rightIcon={
                  <LSIconDownOutline
                    style={{
                      transform: isExpand ? "rotate(180deg)" : "rotate(0)",
                      color: "#FF7442",
                    }}
                  />
                }
              >
                {isExpand ? "Show less" : "Read more"}
              </CustomButton>
            </HStack>
          </>
        )}
      </Box>
    </VStack>
  );
}
