"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import successGIF from "@/assets/gif/success.gif";
import failureGIF from "@/assets/gif/failure.gif";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import Image from "@/components/atoms/NextImageWrapper/Image";
import VStack from "@/components/ui/VStack";
import clsx from "clsx";
import HStack from "@/components/ui/HStack";
import dayjs from "dayjs";
import Button from "@/components/ui/Button";

export default function PaymentStatusWrapper() {
  const router = useRouter();

  const loading = useAppSelector((state) => state?.payment?.loading);
  const { paymentDetails, message, status } = useAppSelector(
    (state) => state?.payment
  );

  useEffect(() => {
    if (paymentDetails && paymentDetails?.subscriptionStatus === 1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [paymentDetails]);

  console.log({ paymentDetails, message, status });
  return (
    <div className="bg-soft-gray">
      {(paymentDetails || (status === "error" && message)) && (
        <div className="flex items-center justify-center w-full min-h-[80vh] m-auto">
          <VStack className="items-center bg-white rounded-[35px_0_35px_0] border-[1px] border-primary-300 p-6">
            <VStack className="items-center max-w-[20rem]">
              <Image
                src={
                  paymentDetails?.subscriptionStatus != 1
                    ? failureGIF.src
                    : successGIF.src
                }
                parentClass="h-auto aspect-[1/1] w-[3rem]"
                alt="pickmymaid success"
              />
              <h1 className="heading-section-title">
                AED{" "}
                {paymentDetails?.subscribedPlan === 0
                  ? 350
                  : paymentDetails?.subscribedPlan === 1
                  ? 495
                  : paymentDetails?.subscribedPlan === 2
                  ? 899
                  : "Ughh!"}
              </h1>
              <h3
                className={clsx(
                  "heading-tertiary",
                  paymentDetails?.subscriptionStatus != 1
                    ? "text-[red]"
                    : "text-black-700"
                )}
              >
                {paymentDetails?.subscriptionStatus != 1
                  ? "Payment Failed"
                  : "Payment Success"}
              </h3>
              <p className="text-description text-center">
                {paymentDetails?.subscriptionStatus != 1
                  ? message
                  : "Your payment has been successfully done!"}
              </p>
            </VStack>
            {paymentDetails?.subscriptionStatus == 1 && (
              <VStack className="items-center">
                <HStack className="items-center justify-between w-[100%] border-b-[1px] border-[rgba(0,0,0,0.1)] py-2">
                  <p className="text-description">Transaction ID:</p>
                  <p className="text-description">
                    {paymentDetails?.transactionID}
                  </p>
                </HStack>
                <HStack className="items-center justify-between w-[100%] border-b-[1px] border-[rgba(0,0,0,0.1)] py-2">
                  <p className="text-description">Subscribed Plan:</p>
                  <p className="text-description">
                    {paymentDetails?.subscribedPlan === 0
                      ? "Basic"
                      : paymentDetails?.subscribedPlan === 1
                      ? "Standard"
                      : "Premium"}
                  </p>
                </HStack>
                <HStack className="items-center justify-between w-[100%] border-b-[1px] border-[rgba(0,0,0,0.1)] py-2">
                  <p className="text-description">Payment Date:</p>
                  <p className="text-description">
                    {dayjs(paymentDetails?.paymentDate).format("DD-MM-YYYY")}
                  </p>
                </HStack>
              </VStack>
            )}
            <Button className="btn-solid" onClick={() => router.push("/")}>
              Goto Home
            </Button>
          </VStack>
        </div>
      )}
    </div>
    // <Box bg="soft.gray">
    //   {loading && <Loading text="Fetching your payment details" />}
    //   {(paymentDetails || (status === "error" && message)) && (
    //     <Center w="100%" minH="80vh" margin="auto">
    //       <VStack
    //         bg="white"
    //         borderRadius="35px 0px 35px 0"
    //         border="1px solid"
    //         borderColor="brand.primary.300"
    //         padding="6"
    //         gap={4}
    //       >
    //         <VStack maxW="20rem">
    //           <Image
    //             src={paymentDetails?.subscriptionStatus != 1 ? failureGIF.src : successGIF.src}
    //             h="auto"
    //             aspectRatio={1 / 1}
    //             w="3rem"
    //             alt="pickmymaid success"
    //           />
    //           <Heading as="h1" variant="sectionTitle">
    //             AED{" "}
    //             {paymentDetails?.subscribedPlan === 0
    //               ? 350
    //               : paymentDetails?.subscribedPlan === 1
    //               ? 495
    //               : paymentDetails?.subscribedPlan === 2
    //               ? 899
    //               : "Ughh!"}
    //           </Heading>
    //           <Heading
    //             variant="tertiary"
    //             color={paymentDetails?.subscriptionStatus != 1 ? "red" : "text.black.700"}
    //           >
    //             {paymentDetails?.subscriptionStatus != 1 ? "Payment Failed" : "Payment Success"}
    //           </Heading>
    //           <Text variant="description" textAlign="center">
    //             {paymentDetails?.subscriptionStatus != 1
    //               ? message
    //               : "Your payment has been successfully done!"}
    //           </Text>
    //         </VStack>
    //         {paymentDetails?.subscriptionStatus == 1 && (
    //           <VStack divider={<StackDivider borderColor="gray" />}>
    //             <HStack justifyContent="space-between" w="100%">
    //               <Text variant="description">Transaction ID:</Text>
    //               <Text variant="description">
    //                 {paymentDetails?.transactionID}
    //               </Text>
    //             </HStack>
    //             <HStack justifyContent="space-between" w="100%">
    //               <Text variant="description">Subscribed Plan:</Text>
    //               <Text variant="description">
    //                 {paymentDetails?.subscribedPlan === 0
    //                   ? "Basic"
    //                   : paymentDetails?.subscribedPlan === 1
    //                   ? "Standard"
    //                   : "Premium"}
    //               </Text>
    //             </HStack>
    //             <HStack justifyContent="space-between" w="100%">
    //               <Text variant="description">Payment Date:</Text>
    //               <Text variant="description">
    //                 {moment(paymentDetails?.paymentDate).format("DD-MM-YYYY")}
    //               </Text>
    //             </HStack>
    //           </VStack>
    //         )}
    //         <Button variant="solid" onClick={() => router.push("/")}>
    //           Goto Home
    //         </Button>
    //       </VStack>
    //     </Center>
    //   )}
    // </Box>
  );
}
