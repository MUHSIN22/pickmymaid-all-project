import React from "react";
import "./paymentVerification.css";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { verifySubscription } from "@/lib/features/payment/paymentAction";
import VStack from "@/components/ui/VStack";

export default function PaymentPageWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const { paymentDetails } = useAppSelector((state) => state.payment);

  const verifyPayment = async () => {
    const transID = searchParams.get("ref");
    await dispatch(verifySubscription({ body: { Tid: transID || "" } }));
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams) {
      verifyPayment();
    }
  }, [searchParams]);

  useEffect(() => {
    const source = localStorage.getItem("source");
    console.log({
      paymentDetails,
      txnID: paymentDetails?.transactionID,
      loading,
    });
    if (paymentDetails && paymentDetails?.subscriptionStatus == 1) {
      if (source === "google") {
        router.replace("/payment-status/success-google");
      } else if (source === "facebook") {
        router.replace("/payment-status/success-fb");
      } else {
        router.replace("/payment-status/success");
      }
    } else if (!loading) {
      router.replace("/payment-status/failed");
    }
  }, [paymentDetails, loading]);

  return (
    <div className="flex w-full min-h-[100vh] flex-col bg-white items-center justify-center p-[1rem] gap-[1rem]">
      <VStack className="items-center w-[100%] h-[100%]">
        <h2 className="heading-primary text-primary-300">Hold On!</h2>
        <p className="text-description">
          We're verifying your payment. Please don't close this page
        </p>
        <div className="loader max-w-[40rem]"></div>
      </VStack>
    </div>
  );
}
