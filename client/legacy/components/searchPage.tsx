// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// // import { Button, Drawer, DrawerContent, Flex, Menu, MenuButton, MenuItem, MenuList, Show, Text, useDisclosure } from "@chakra-ui/react";
// import React, { useState, useEffect, useRef, Fragment } from "react";
// import BannerSection from "./_search-page-sections/Banner/BannerSection";
// import Cards from "./_search-page-sections/CardsSection/Cards";
// import CountryButtonWrapper from "@/components/atoms/CountryButtonWrapper/CountryButtonWrapper";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { useQueries } from "@/lib/hooks/getQueries";
// import { filterByCountry, filterByLocationAndService } from "@/lib/features/maid/maidSlice";
// import { filterSearchParams } from "@/utils/searchMaidParamsFilter";
// import Pagination from "@/components/atoms/Pagination/Pagination";
// import { useParams, useSearchParams, useRouter } from "next/navigation";
// import { RootState } from "@/lib/store";

// const sorting: { [key: number]: string } = {
//     1: "Salary low to high",
//     2: "Salary high to low",
// };

// const SearchMaid = () => {
//     // const { isOpen, onOpen, onClose } = useDisclosure();
//     const [sortIndex, setSortIndex] = useState("0");

//     const dispatch = useAppDispatch();
//     const { maidsCount } = useAppSelector((state: RootState) => state.maid);
//     const data = useAppSelector((state: RootState) => state.maid.data);
//     const [_, setSelectedData] = useState("");

//     const searchParams = useSearchParams();
//     const router = useRouter();

//     const { country: URLCountry, keyword } = useParams();

//     const currentPage = Number(searchParams.get("page") || 1);
//     const country = searchParams.get("country");
//     const location = searchParams.get("location");
//     const service = searchParams.get("service");
//     const statusHeading = useRef<HTMLDivElement | null>(null);
//     const { addQueries } = useQueries();

//     useEffect(() => {
//         if (data) {
//             if (country) {
//                 dispatch(filterByCountry(country));
//             } else if (location && service) {
//                 dispatch(filterByLocationAndService({ location, service }));
//             }
//         }
//     }, [country, location, service, data]);

//     const paginationHandler = (page: number) => {
//         if (page < 1) return;
//         const newParams = new URLSearchParams(searchParams.toString());
//         newParams.set("page", page.toString());
//         router.push(`?${newParams.toString()}`);
//         addQueries("page", page?.toString());
//     };

//     const sortHandler = (item: any) => {
//         setSortIndex(item);
//         const newParams = new URLSearchParams(searchParams.toString());
//         newParams.set("sort", sorting[item].toLocaleLowerCase());
//         newParams.set("page", "1");
//         router.push(`?${newParams.toString()}`);
//     };

//     useEffect(() => {
//         if (statusHeading?.current) {
//             localStorage.setItem("cardTop", statusHeading?.current?.getBoundingClientRect()?.top.toString());
//         }
//     }, [statusHeading?.current]);

//     useEffect(() => {
//         if (URLCountry && keyword) {
//             setSelectedData(`${filterSearchParams(keyword as string)[0]}_${URLCountry}`);
//         } else if (keyword && !keyword.includes("available-in-uae")) {
//             const filteredKeyword = filterSearchParams(keyword as string);
//             const filter = `${filteredKeyword?.[0]}_${filteredKeyword[1]}`;
//             setSelectedData(filter);
//         }
//     }, [URLCountry, keyword]);

//     return (
//         <Fragment>
//             <div>
//                 <BannerSection />
//                 <div className="px-4 md:px-14 lg:px-16">
//                     <div className="mt-3">
//                         <CountryButtonWrapper grayBg />
//                     </div>
//                     <div className="mt-[30px] justify-between gap-[10px] flex flex-col md:flex-row sm:flex-col">
//                         <div
//                             className="flex! w-full! md:justify-between! justify-center! z-[10]!"
//                             ref={statusHeading}>
//                             <h1 className="font-weight-500! text-text-black-700! text-lg! ">
//                                 <span className="text-brand-primary-300!">
//                                     Found <span className="font-[600]!">{maidsCount}</span> result
//                                 </span>
//                                 according to your requirement
//                             </h1>
//                             {/* <Menu isOpen={showMenu} setIsOpen={setShowMenu}>
//                 <MenuButton onClick={() => setShowMenu(!showMenu)}>
//                   <span className="cursor-pointer! group-hover:text-white!"> Sort <span className="text-brand-primary-200! pl-2! font-[600]!">{t(sorting[sortIndex])}</span></span>
//                   <RiArrowUpDownLinel className="text-brand-primary-400! group-hover:text-white! w-[16px] h-[16px]" />
//                 </MenuButton>
//                 <MenuList>
//                   <MenuItem onClick={() => sortHandler(1)}>{t(sorting[1])}</MenuItem>
//                   <MenuItem onClick={() => sortHandler(2)}>{t(sorting[2])}</MenuItem>
//                 </MenuList>
//               </Menu> */}
//                             <div className="md:block hidden">
//                                 {/* <Menu>
//                                     <MenuButton
//                                         as={Button}
//                                         color="brand.primary.300"
//                                         fontWeight={500}
//                                         borderColor="brand.primary.300"
//                                         _hover={{ bg: "brand.primary.300", color: "white" }}
//                                         bg="white"
//                                         borderWidth="1px"
//                                         px={2}
//                                         borderLeft={{ base: "none", md: "1px" }}
//                                         borderRadius={{
//                                             base: "0px 0px 10px 0",
//                                             md: "10px 0px 10px 0",
//                                         }}>
//                                         <div className="flex! justify-center! items-center! gap-[0.5rem]">
//                                             Sort <span className="text-brand-primary-200!">{sorting[sortIndex]}</span>
//                                             <RiArrowUpDownLinel />
//                                         </div>
//                                     </MenuButton>
//                                     <MenuList>
//                                         {Object.keys(sorting)?.map((item, i) => (
//                                             <MenuItem
//                                                 onClick={() => sortHandler(item)}
//                                                 key={i}>
//                                                 {sorting[item]}
//                                             </MenuItem>
//                                         ))}
//                                     </MenuList>
//                                 </Menu> */}
//                             </div>
//                         </div>
//                         <div className="flex! justify-center! items-center! fixed! bottom-6! z-10! md:left-0! left-1/2! md:transform-none! transform-x-1/2!">
//                             {/* <Flex
//                                 justifyContent="center"
//                                 alignItems="center"
//                                 pos={{ base: "fixed", md: "static" }}
//                                 bottom={{ base: "6rem", md: "0" }}
//                                 zIndex="100"
//                                 left={{ base: "50%", md: "0" }}
//                                 transform={{ base: "translateX(-50%)", md: "none" }}>
//                                 <Show below="md">
//                             <CustomButton
//                                 leftIcon={<FiFilter style={{ width: "16px", height: "16px" }} />}
//                                 variant="solid"
//                                 onClick={onOpen}
//                                 aria-label="Call Segun"
//                                 borderRadius={{ base: "10px 0 0 0" }}
//                                 bg="white"
//                                 border="1px solid"
//                                 borderColor="brand.primary.300"
//                                 color="brand.primary.300"
//                                 py={0}
//                                 px={2}>
//                                 Filter
//                             </CustomButton>
//                         </Show>
//                         <Menu>
//                             <MenuButton
//                                 as={Button}
//                                 color="brand.primary.300"
//                                 fontWeight={500}
//                                 borderColor="brand.primary.300"
//                                 _hover={{ bg: "brand.primary.300", color: "white" }}
//                                 bg="white"
//                                 borderWidth="1px"
//                                 px={2}
//                                 borderLeft={{ base: "none", md: "1px" }}
//                                 borderRadius={{
//                                     base: "0px 0px 10px 0",
//                                     md: "10px 0px 10px 0",
//                                 }}>
//                                 <Flex
//                                     alignItems="center"
//                                     gap="0.5rem">
//                                     Sort{" "}
//                                     <Text
//                                         color="brand.primary.200"
//                                         as="span">
//                                         {sorting[sortIndex]}
//                                     </Text>
//                                     <RiArrowUpDownLinel />
//                                 </Flex>
//                             </MenuButton>
//                             <MenuList>
//                                 {Object.keys(sorting)?.map((item, i) => (
//                                     <MenuItem
//                                         onClick={() => sortHandler(item)}
//                                         key={i}>
//                                         {sorting[item]}
//                                     </MenuItem>
//                                 ))}
//                             </MenuList>
//                         </Menu>
//                     </Flex> */}
//                         </div>
//                         <div className="md:hidden block">
//                             {/* <Drawer
//                                 isOpen={isOpen}
//                                 placement="left"
//                                 onClose={onClose}>
//                                 <DrawerContent
//                                     pl={4}
//                                     sx={{ zIndex: "999 !important" }}
//                                     layerStyle="myCustomLayerStyle">
//                                     <Filter onClose={onClose} />
//                                 </DrawerContent>
//                             </Drawer> */}
//                         </div>
//                     </div>
//                     <div className="grid! pt-1! grid-cols-[1fr]! md:grid-cols-[300px_1fr]!">
//                         <div className="hidden md:block">
//                             <aside>
//                                 {/* <Filter onClose={onClose} /> */}
//                             </aside>
//                         </div>
//                         <Cards />
//                     </div>
//                     <div className="grid place-items-center">
//                         <Pagination
//                             currentPage={currentPage}
//                             onPageChange={(page) => {
//                                 paginationHandler(page);
//                                 window.scrollTo(0, Number(localStorage.getItem("cardTop")) || 0);
//                             }}
//                             totalPages={Math.ceil(Number(maidsCount) / 9)}
//                         />
//                     </div>
//                 </div>
//             </div >
//         </Fragment >
//     );
// };

// export default React.memo(SearchMaid);
