"use client";
import { Suspense } from "react";
import SearchPage from "./_page-container/SearchPage";

const Search = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default Search;
