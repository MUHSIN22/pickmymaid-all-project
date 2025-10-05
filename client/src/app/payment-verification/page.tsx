"use client";

import dynamic from "next/dynamic";

const PaymentPageWrapper = dynamic(() => import("./PaymentPageWrapper"), {
  ssr: false,
});

export default function PaymentVerification() {
  return <PaymentPageWrapper />;
}
