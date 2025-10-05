"use client";

import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerContent,
  Flex,
  Grid,
  Heading,
  Hide,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef, Fragment } from "react";
import BannerSection from "./_SearchMaidSections/Banner/BannerSection";
import Filter from "./_SearchMaidSections/filterSection/Filter";
import Cards from "./_SearchMaidSections/CardsSection/Cards";
import { commonPadding } from "@/components/atoms/styles";
import CountryButtonWrapper from "@/components/atoms/CountryButtonWrapper/CountryButtonWrapper";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useQueries } from "@/lib/hooks/getQueries";
import { filterByCountry, filterByLocationAndService } from "@/lib/features/maid/maidSlice";
import { filterSearchParams } from "@/utils/searchMaidParamsFilter";
import Pagination from "@/components/atoms/Pagination/Pagination";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { FiFilter, RiArrowUpDownLinel } from "@/components/atoms/Icons/Icons";
import CustomButton from "@/components/atoms/CustomButton/CustomButton";

const sorting = {
  1: "searchmaid.filter.sortSalaryLow",
  2: "searchmaid.filter.sortSalaryHigh",
};

const SearchMaid = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sortIndex, setSortIndex] = useState("0");

  const dispatch = useAppDispatch();
  const { maidsCount } = useAppSelector((state) => state.maid);
  const data = useAppSelector((state) => state.maid.data);
  const [_, setSelectedData] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const { country: URLCountry, keyword } = useParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const country = searchParams.get("country");
  const location = searchParams.get("location");
  const service = searchParams.get("service");
  const pageNumberUrl = searchParams.get("page");
  const statusHeading = useRef<HTMLDivElement | null>(null);
  const { addQueries } = useQueries();
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      if (country) {
        dispatch(filterByCountry(country));
      } else if (location && service) {
        dispatch(filterByLocationAndService({ location, service }));
      }
    }
  }, [country, location, service, data]);

  const paginationHandler = (page) => {
    if (page < 1) return;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    router.push(`?${newParams.toString()}`);
    addQueries("page", page);
  };

  // useEffect(() => {
  // const page = searchParams.get("page");
  // if (page) {
  //   paginationHandler(Number(page));
  // }
  // }, [data, pageNumberUrl]);

  const sortHandler = (item: any) => {
    setSortIndex(item);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", t(sorting[item]).toLocaleLowerCase());
    newParams.set("page", "1");
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    if (statusHeading?.current) {
      localStorage.setItem("cardTop", statusHeading?.current?.getBoundingClientRect()?.top.toString());
    }
  }, [statusHeading?.current]);

  useEffect(() => {
    if (URLCountry && keyword) {
      setSelectedData(`${filterSearchParams(keyword as string)[0]}_${URLCountry}`);
    } else if (keyword && !keyword.includes("available-in-uae")) {
      const filteredKeyword = filterSearchParams(keyword as string);
      const filter = `${filteredKeyword?.[0]}_${filteredKeyword[1]}`;
      setSelectedData(filter);
    }
  }, [URLCountry, keyword]);

  return (
    <Fragment>
      <Box>
        <BannerSection />
        <Box sx={commonPadding}>
          <Box mt={3}>
            <CountryButtonWrapper grayBg />
          </Box>
          <Flex
            mt="30px"
            gap="10px"
            flexDirection={{ base: "column", sm: "column", md: "row" }}>
            <Flex ref={statusHeading}>
              <Heading
                as="h1"
                fontWeight={500}
                color="text.black.600"
                size="md">
                <Text
                  as="span"
                  color="brand.primary.300">
                  {t("searchmaid.middle.found")}{" "}
                  <Text
                    as="span"
                    fontWeight={600}>
                    {maidsCount} {t("searchmaid.middle.result")}{" "}
                  </Text>
                </Text>
                {t("searchmaid.middle.text")}
              </Heading>
            </Flex>
            <Spacer />
            <Flex
              justifyContent="center"
              alignItems="center"
              pos={{ base: "fixed", md: "static" }}
              bottom={{ base: "6rem", md: "0" }}
              zIndex="100"
              left={{ base: "50%", md: "0" }}
              transform={{ base: "translateX(-50%)", md: "none" }}>
              <Show below="md">
                {/* todo_add_button */}
                <CustomButton
                  leftIcon={<FiFilter style={{ width: "16px", height: "16px" }} />}
                  variant="solid"
                  onClick={onOpen}
                  aria-label="Call Segun"
                  borderRadius={{ base: "10px 0 0 0" }}
                  bg="white"
                  border="1px solid"
                  borderColor="brand.primary.300"
                  color="brand.primary.300"
                  py={0}
                  px={2}>
                  Filter
                </CustomButton>
              </Show>
              <Menu>
                {/* todo_add_button */}
                <MenuButton
                  as={Button}
                  color="brand.primary.300"
                  fontWeight={500}
                  borderColor="brand.primary.300"
                  _hover={{ bg: "brand.primary.300", color: "white" }}
                  bg="white"
                  borderWidth="1px"
                  px={2}
                  borderLeft={{ base: "none", md: "1px" }}
                  borderRadius={{
                    base: "0px 0px 10px 0",
                    md: "10px 0px 10px 0",
                  }}>
                  <Flex
                    alignItems="center"
                    gap="0.5rem">
                    {t("searchmaid.filter.sortby")}{" "}
                    <Text
                      color="brand.primary.200"
                      as="span">
                      {t(sorting[sortIndex])}
                    </Text>
                    <RiArrowUpDownLinel />
                  </Flex>
                </MenuButton>
                <MenuList>
                  {Object.keys(sorting)?.map((item, i) => (
                    <MenuItem
                      onClick={() => sortHandler(item)}
                      key={i}>
                      {t(sorting[item])}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
            <Show below="md">
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}>
                <DrawerContent
                  pl={4}
                  sx={{ zIndex: "999 !important" }}
                  layerStyle="myCustomLayerStyle">
                  <Filter onClose={onClose} />
                </DrawerContent>
              </Drawer>
            </Show>
          </Flex>
          <Grid
            pt="1rem"
            templateColumns={{ sm: "1fr", md: "300px 1fr" }}
            as="section">
            <Hide below="md">
              <Box as="aside">
                <Filter onClose={onClose} />
              </Box>
            </Hide>
            <Cards />
          </Grid>
          <Center>
            <Pagination
              currentPage={currentPage}
              onPageChange={(page) => {
                paginationHandler(page);
                window.scrollTo(0, Number(localStorage.getItem("cardTop")) || 0);
              }}
              totalPages={Math.ceil(Number(maidsCount) / 9)}
            />
          </Center>
        </Box>
        {/* {availableMarketingKeys.includes(selectedData) && <MarketingSection category={selectedData} />} */}
      </Box>
    </Fragment>
  );
};

export default React.memo(SearchMaid);
