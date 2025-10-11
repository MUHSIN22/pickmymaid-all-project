"use client";
import BlogCard from "../../atoms/Cards/BlogCard/BlogCard";
import VStack from "../../ui/VStack";
import { getBlogs } from "../../../lib/features/blogs/blogsAction";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import React, { useMemo, useState } from "react";

export default function BlogsList() {
  const dispatch = useAppDispatch();

  const { blogs, status, totalPages, fetchedPage } = useAppSelector(
    (state) => state?.blogs
  );

  const [page, setPage] = useState<number>(1);

  const blogFetcher = async () => {
    if (fetchedPage !== page) {
      await dispatch(getBlogs({ page }));
    }
  };

  useMemo(() => {
    if ((page === 1 && blogs?.length === 0) || page > 1) {
      blogFetcher();
    }
  }, [page]);
  return (
    <div className="px-4 md:px-10 py-4 flex justify-center items-center">
      <VStack className="items-center w-[100%] max-w-[1400px] items-[start] gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 w-[100%]">
          {blogs?.map((blog) => (
            <BlogCard data={blog} key={blog.blogID} />
          ))}
        </div>
      </VStack>
    </div>
  );
}
