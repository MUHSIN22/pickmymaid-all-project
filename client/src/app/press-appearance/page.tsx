"use client";
import dynamic from "next/dynamic";
import React from "react";
const PressAppearanceWrapper = dynamic(
  () => import("./PressAppearanceWrapper"),
  { ssr: false }
);

export default function page() {
  return <PressAppearanceWrapper />;
}
