/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { Button, Drawer, DrawerContent, Flex, Menu, MenuButton, MenuItem, MenuList, Show, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect, useRef, Fragment } from "react";
import BannerSection from "./_search-page-sections/Banner/BannerSection";
import Filter from "./_search-page-sections/filterSection/Filter";
import Cards from "./_search-page-sections/CardsSection/Cards";
import CountryButtonWrapper from "@/components/atoms/CountryButtonWrapper/CountryButtonWrapper";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useQueries } from "@/lib/hooks/getQueries";
import { filterByCountry, filterByLocationAndService } from "@/lib/features/maid/maidSlice";
import { filterSearchParams } from "@/utils/searchMaidParamsFilter";
import Pagination from "@/components/atoms/Pagination/Pagination";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import SortMenu from "./_search-page-sections/sort-menu/SortMenu";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FiFilter } from "@/components/atoms/Icons/Icons";
import { fetchMaidCounts } from "@/lib/features/maid/maidAction";
// import { FiFilter, RiArrowUpDownLinel } from "@/components/atoms/Icons/Icons";
// import CustomButton from "@/components/atoms/CustomButton/CustomButton";

const sorting: { [key: number]: string } = {
    1: "salary low to high",
    2: "salary high to low",
};

const SearchMaid = () => {
    const [sortIndex, setSortIndex] = useState("0");
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const dispatch = useAppDispatch();
    const { maidsCount } = useAppSelector((state) => state.maid);
    const data = useAppSelector((state) => state.maid.data);
    const counts = useAppSelector((state) => state.maid.counts);
    const [_, setSelectedData] = useState("");

    const searchParams = useSearchParams();
    const router = useRouter();

    const { country: URLCountry, keyword } = useParams();

    const currentPage = Number(searchParams.get("page") || 1);
    const country = searchParams.get("country");
    const location = searchParams.get("location");
    const service = searchParams.get("service");
    const statusHeading = useRef<HTMLDivElement | null>(null);
    const { addQueries } = useQueries();

    useEffect(() => {
        if (!counts) {
            dispatch(fetchMaidCounts())
        }
    }, [dispatch, counts])

    useEffect(() => {
        if (data) {
            if (country) {
                dispatch(filterByCountry(country));
            } else if (location && service) {
                dispatch(filterByLocationAndService({ location, service }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, location, service, data]);

    const paginationHandler = (page: number) => {
        if (page < 1) return;
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", page.toString());
        router.push(`?${newParams.toString()}`);
        addQueries("page", page?.toString());
    };

    const sortHandler = (item: any) => {
        setSortIndex(item);
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("sort", sorting[item].toLocaleLowerCase());
        newParams.set("page", "1");
        router.push(`?${newParams.toString()}`);
    };

    useEffect(() => {
        if (statusHeading?.current) {
            localStorage.setItem("cardTop", statusHeading?.current?.getBoundingClientRect()?.top.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div>
                <BannerSection />
                <div className="px-4 md:px-14 lg:px-16">
                    <div className="mt-3">
                        {counts && <CountryButtonWrapper count={counts} grayBg />}
                    </div>
                    <div className="mt-[30px] justify-between gap-[10px] flex flex-col md:flex-row sm:flex-col">
                        <div
                            className="flex w-full md:justify-between justify-center z-[10]"
                            ref={statusHeading}>
                            <h1 className="font-weight-500 text-text-black-700 text-lg ">
                                <span className="text-brand-primary-300">
                                    Found <span className="font-[600]">{maidsCount}</span> results
                                </span>{" "}
                                according to your requirement
                            </h1>
                            <div className="md:block hidden">
                                <SortMenu
                                    items={sorting}
                                    onSort={sortHandler}
                                />
                            </div>
                        </div>
                        <div className="flex md:hidden text-[16px] justify-center items-center fixed bottom-[85px] z-10 md:left-0 left-1/2 translate-x-[-50%]">
                            <div className="flex">
                                <button
                                    className="bg-white flex gap-1 items-center hover:bg-primary-300 hover:text-white text-primary-400 rounded-tl-[10px] px-2 py-1 border-[1px] border-primary-400 border-r-0"
                                    onClick={toggleDrawer}>
                                    <FiFilter style={{ width: "16px", height: "16px" }} />
                                    Filter
                                </button>
                                <SortMenu
                                    smallDevice
                                    items={sorting}
                                    onSort={sortHandler}
                                />
                            </div>
                        </div>
                        <div className="md:hidden block">
                            <Drawer
                                open={isOpen}
                                onClose={toggleDrawer}
                                direction="left"
                                className="bg-white p-2 pr-0"
                                style={{ width: "300px" }}>
                                <div className="bg-white pt-8">
                                    <Filter onClose={toggleDrawer} />
                                </div>
                            </Drawer>
                        </div>
                    </div>
                    <div className="grid pt-1 grid-cols-[1fr] md:grid-cols-[300px_1fr]">
                        <div className="hidden md:block">
                            <aside className="sticky top-16">
                                <Filter onClose={toggleDrawer} />
                            </aside>
                        </div>
                        <Cards />
                    </div>
                    <div className="grid place-items-center">
                        <Pagination
                            currentPage={currentPage}
                            onPageChange={(page) => {
                                paginationHandler(page);
                                window.scrollTo(0, Number(localStorage.getItem("cardTop")) || 0);
                            }}
                            totalPages={Math.ceil(Number(maidsCount) / 9)}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default React.memo(SearchMaid);
