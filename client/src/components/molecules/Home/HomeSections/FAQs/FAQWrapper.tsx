"use client";
import dynamic from "next/dynamic";
import React from "react";
const FAQ = dynamic(() => import("./FAQ"), { ssr: false });

export default function FAQWrapper() {
  return <FAQ />;
}
