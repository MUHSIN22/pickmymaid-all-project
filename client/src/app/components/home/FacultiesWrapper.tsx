"use client";
import dynamic from "next/dynamic";
import React from "react";
const Faculties = dynamic(() => import("./Faculties"), { ssr: false });

export default function FacultiesWrapper() {
  return <Faculties />;
}
