"use client";
import dynamic from "next/dynamic";
import React from "react";
const PaymentStatusWrapper = dynamic(() => import("./PaymentStatusWrapper"), {
  ssr: false,
});

export default function page() {
  return <PaymentStatusWrapper />;
}
