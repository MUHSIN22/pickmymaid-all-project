"use client";
import dynamic from "next/dynamic";
import React from "react";
const FooterMain = dynamic(() => import("./FooterMain"), { ssr: false });

export default function FooterWrapper() {
  return <FooterMain />;
}
