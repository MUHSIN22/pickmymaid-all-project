"use client";
import SearchPage from "@/app/search/_page-container/SearchPage";
import { Suspense } from "react";

const Search = () => {
    return (
        <Suspense>
            <SearchPage />
        </Suspense>
    );
};

export default Search;