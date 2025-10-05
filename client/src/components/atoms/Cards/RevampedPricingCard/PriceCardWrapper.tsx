"use client";
import dynamic from "next/dynamic";
import React from "react";
const RevampedPricingCard = dynamic(() => import("./RevampedPricingCard"), {
  ssr: false,
});

export default function PriceCardWrapper(props: any) {
  return <RevampedPricingCard {...props} />;
}
