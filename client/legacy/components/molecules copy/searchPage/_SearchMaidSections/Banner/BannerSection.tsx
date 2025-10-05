"use client";

import { Grid, Heading, Box, VStack, Flex, Input, Button, Icon, UnorderedList, ListItem, Text, InputGroup, FormControl } from "@chakra-ui/react";
import Banner from "@/assets/images/About/banner-background.webp";
import { useEffect, useState } from "react";
import "./style.css";
import { commonPadding, inputFontSize } from "@/components/atoms/styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { BiSearch } from "@/components/atoms/Icons/Icons";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";

const list: string[] = [
  "Muslim",
  "Part Time",
  "UAE",
  "Dubai",
  "Filipino",
  "Indian",
  "Indonesian",
  "Srilankan",
  "Nepali",
  "Malayalam",
  "Arabic",
  "Maid cum Nanny",
  "Maid",
  "Nanny",
  "Cleaning",
  "Cooking",
  "Live-in",
  "Live-out",
  "English",
  "Caregiver",
  "Driver",
  "Private Tutor",
  "Private Nurse",
  "Postpartum care",
  "Cook",
];

const availableNationalities: string[] = ["Philippines", "India", "Nepal", "Srilanka", "Indonesia"];

const BannerSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("nationality");
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [filteredList, setFilteredList] = useState<string[]>(list || []);
  const [isListActive, setListActive] = useState<boolean>(false);

  const handleSearch = () => {
    if (search !== "") {
      router.push(`/search?searchParams=${search}`);
    }
  };

  const handleSuggestionClick = (value) => {
    router.push(`/search?searchParams=${value}`);
  };

  useEffect(() => {
    if (search === "") {
      setFilteredList(list);
    } else if (search) {
      setFilteredList(list.filter((item) => item.toLowerCase().includes(search?.toLowerCase())));
    }
  }, [search]);

  const handleSearchBoxAppearance = () => {
    document.addEventListener("click", (event) => {
      if (!(event?.target as any)?.className?.includes("search-input") && !(event?.target as any)?.className?.includes("list-item")) {
        setListActive(false);
      }
    });
  };

  useEffect(() => {
    handleSearchBoxAppearance();
  }, []);

  return (
    <Grid
      sx={commonPadding}
      backgroundImage={`url('${availableNationalities.includes(query as string) ? Banner?.src : Banner?.src}')`}
      alignItems="center"
      bgPosition="center"
      bgSize="cover"
      gap="15px"
      backgroundPosition="center"
      py="2rem"
      gridTemplateColumns={{ sm: "1fr ", md: "1fr auto" }}>
      <VStack
        gap="2rem"
        maxW="60rem"
        w="100%"
        mx="auto">
        <Box maxW="30rem">
          <Heading
            color="black"
            variant="sectionTitle"
            textAlign="center"
            fontWeight={600}
            as="h1">
            {t("searchmaid.banner.heading")} <br />
          </Heading>
        </Box>
        <Flex
          bg={{ base: "transparent", md: "white" }}
          p={{ base: 0, md: "0.5rem" }}
          borderRadius="50px"
          border={{ base: "none", md: "1px solid black" }}
          gap="0.5rem"
          w="100%"
          flexDir={{ base: "column", md: "row" }}
          pos="relative"
          zIndex={100}>
          <FormControl
            pos="relative"
            zIndex={11}>
            <InputGroup
              pos="relative"
              zIndex={11}>
              <Input
                className="search-input"
                outline="none"
                outlineOffset="0"
                bg="white"
                border={{ base: "1px solid black", md: "none" }}
                borderRadius="50px"
                onChange={(event) => setSearch(event.target.value)}
                _hover={{
                  border: "1px solid white",
                  outline: "1px solid white",
                  outlineOffset: "0",
                }}
                _active={{
                  border: "1px solid white",
                  outline: "1px solid white",
                  outlineOffset: "0",
                }}
                _focus={{
                  border: "1px solid white",
                  outline: "1px solid white",
                  outlineOffset: "0",
                }}
                placeholder="Search by type eg. Cook Cleaning"
                sx={inputFontSize}
                list="list"
                onFocus={() => setListActive(true)}
              />
              {isListActive && filteredList && filteredList?.length > 0 && (
                <UnorderedList
                  pos="absolute"
                  bottom={0}
                  left={0}
                  transform="translateY(calc(100% + 0.5rem))"
                  bg="white"
                  styleType="none"
                  boxShadow="0px 0px 10px rgba(0,0,0,0.1)"
                  m={0}
                  minW="80%"
                  overflow="hidden"
                  borderRadius="8px"
                  maxH="10rem"
                  overflowY="scroll"
                  zIndex={11}>
                  {filteredList?.map((item, index) => (
                    <ListItem
                      className="list-item"
                      p="0.5rem"
                      py="0.3rem"
                      _hover={{
                        bg: "rgba(189, 224, 254, 0.3)",
                      }}
                      key={index}
                      cursor="pointer"
                      onClick={() => {
                        handleSuggestionClick(item);
                        setListActive(false);
                      }}>
                      <Text variant="description">{item}</Text>
                    </ListItem>
                  ))}
                </UnorderedList>
              )}
            </InputGroup>
          </FormControl>
          {/* <Button
            variant="solid"
            py="0.5rem"
            fontWeight="500"
            borderRadius="50px"
            pos="relative"
            zIndex={8}
            boxShadow="0px 0.64px 1.4px 0px #FF5A1E03, 0px 1.93px 4.25px 0px #FF5A1E09,0px 5.11px 11.23px 0px #FF5A1E18,0px 16px 35.2px 0px #FF5A1E4D"
            // leftIcon={<BiSearch />}
            onClick={handleSearch}>
            Search
          </Button> */}
          <CustomButton
            variant="solid"
            py="0.5rem"
            fontWeight="500"
            borderRadius="50px"
            pos="relative"
            zIndex={8}
            boxShadow="0px 0.64px 1.4px 0px #FF5A1E03, 0px 1.93px 4.25px 0px #FF5A1E09,0px 5.11px 11.23px 0px #FF5A1E18,0px 16px 35.2px 0px #FF5A1E4D"
            onClick={handleSearch}
            leftIcon={<BiSearch />}
          >
            Search
          </CustomButton>
        </Flex>
      </VStack>
    </Grid>
  );
};

export default BannerSection;
