"use client";
import dynamic from "next/dynamic";
import React from "react";
const BlogList = dynamic(() => import("./BlogsList"), { ssr: false });

export default function BlogsWrapper() {
  return <BlogList />;
}
