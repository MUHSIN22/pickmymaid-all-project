"use client";
import SearchPage from "../../search/_page-container/SearchPage";
import { Suspense } from "react";

const Search = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default Search;
