"use client";
import { motion } from "framer-motion";
import { IPricingCardData } from "@/types/components/pricingSection/pricingSection.types";
import { useAppSelector } from "@/lib/hooks";
import { useAppDispatch } from "@/lib/hooks";
import useCustomToast from "@/lib/hooks/useCustomToast";
import {
  resetPaymentLink,
  resetState,
  setPaymentTypeSelected,
} from "@/lib/features/payment/paymentSlice";
import { generatePaymentLink } from "@/lib/features/payment/paymentAction";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import {
  addPaymentType,
  addRedirection,
} from "@/lib/features/utilSlice/utileSlice";
import { useMemo } from "react";
import VStack from "@/components/ui/VStack";
import clsx from "clsx";
import HStack from "@/components/ui/HStack";
import Button from "@/components/ui/Button";
import { RiCloseFill, TiTick } from "../../Icons/Icons";

export default function RevampedPricingCard({
  data,
}: {
  data: IPricingCardData;
}) {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const user = useAppSelector((state) => state?.auth?.user);
  const {
    loading,
    status,
    message,
    selectedType: typeSelected,
    paymentDetails,
    paymentLink,
  } = useAppSelector((state) => state?.payment);

  const handlePayment = () => {
    if (user) {
      dispatch(setPaymentTypeSelected(data.type));
      dispatch(generatePaymentLink(data.type));
    } else {
      dispatch(setAuthModal("signup"));
      dispatch(addRedirection("payment"));
      dispatch(addPaymentType(data.type));
    }
  };

  useMemo(() => {
    if (paymentLink) {
      window.location.href = paymentLink;
      dispatch(resetPaymentLink());
    }
  }, [paymentLink]);

  useMemo(() => {
    if (status === "error" && message) {
      toast("Ugh no!", message, "error");
      dispatch(resetState());
    }
  }, [status, message]);

  return (
    <VStack
      className={clsx(
        "items-center bg-white p-[1rem] pb-[1.5rem] items-start gap-[1rem] rounded-[25px] border-[1px] border-[#855FFF] relative overflow-hidden",
        paymentDetails?.subscriptionStatus === 1 &&
          paymentDetails?.subscribedPlan === data.type &&
          `
        relative
        before:content-['Active']
        before:absolute
        before:right-0
        before:top-0
        before:font-[600]
        before:text-white
        before:bg-[#855fff]
        before:px-[3rem]
        before:translate-x-[30%]
        before:translate-y-[100%]
        before:rotate-[45deg]
        before:origin-center
        befor:z-[100]
        `
      )}
    >
      <HStack className="w-[100%] justify-between items-center relative">
        <p className="text-sub-title">{data.name}</p>
        {data.type == 1 &&
          !(
            paymentDetails?.subscriptionStatus === 1 &&
            paymentDetails?.subscribedPlan !== data.type
          ) && (
            <p className="text-description bg-[#f9cd65] uppercase p-[2px] rounded-[5px] px-[5px] text-black transform-[scale(0.8)]">
              Best Choice
            </p>
          )}
      </HStack>
      <VStack className="items-start justify-start">
        <h3 className="heading-tertiary font-[600] text-[2rem] sm:text-[2.5rem]">
          AED {data.price}
        </h3>
        <span className="text-highlight text-black-200">{data.validity}</span>
      </VStack>
      <p className="text-description">{data.subTitle}</p>
      <Button
        className="w-[100%] p-[1rem] py-[0.5rem] rounded-md cursor-pointer font-[600] hover:shadow-[0px_0px_20px_rgba(0,0,0,0.1)] hover:transform-[scale(1.02) text-black border-[1px] border-[#855FFF]"
        style={{
          background: `linear-gradient(95deg, #${data.buttonGradient[0]} 0%, #${data.buttonGradient[1]} 50%)`,
        }}
        onClick={handlePayment}
        isDisabled={loading && data.type !== typeSelected}
        isLoading={loading && data.type === typeSelected}
      >
        Get Started
      </Button>
      <VStack className="items-start gap-[1rem]">
        <p className="text-description font-[600]">All the benefits:</p>
        <VStack className="items-start bg-white">
          {data?.features?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.2 * index, duration: 0.3 },
              }}
              className="flex items-start justify-start gap-2"
            >
              {item.isAvailable ? (
                <TiTick className="w-6 text-green-600 mt-[5px] grow-[10]" />
              ) : (
                <RiCloseFill className="w-6 text-red-600 mt-[5px] grow-[10]" />
              )}

              <p
                className={`text-left shrink-[10] text-[0.8rem] sm:text-[0.9rem] xl:text-[1rem] text-black/80 ${
                  !item.isAvailable ? "line-through opacity-50" : ""
                }`}
              >
                {item.feature}
              </p>
            </motion.div>
          ))}
        </VStack>
      </VStack>
    </VStack>

    // <VStack
    //   bg="white"
    //   p="1rem"
    //   pb="1.5rem"
    //   alignItems="flex-start"
    //   gap="1rem"
    //   borderRadius="25px"
    //   border="1px solid #855FFF"
    //   pos="relative"
    //   overflow="hidden"
    //   _before={
    //     paymentDetails?.subscriptionStatus === 1 &&
    //     paymentDetails?.subscribedPlan === data.type
    //       ? {
    //           content: `'Active'`,
    //           bg: "white",
    //           bgGradient: `linear(95deg, #${data.buttonGradient[0]} 0%, #${data.buttonGradient[1]} 50%)`,
    //           padding: "0 3rem",
    //           pos: "absolute",
    //           fontWeight: 500,
    //           right: 0,
    //           top: 0,
    //           transform: "translateX(40%) rotate(45deg) translateY(100%)",
    //           transformOrigin: "center",
    //         }
    //       : data.type === 3
    //       ? {
    //           content: `'Limited Offer'`,
    //           bg: `#${data.buttonGradient[0]}`,
    //           padding: "0 3rem",
    //           pos: "absolute",
    //           fontWeight: 400,
    //           fontSize: "0.9rem",
    //           right: 0,
    //           top: 0,
    //           transform: "translateX(40%) rotate(45deg) translateY(180%)",
    //           transformOrigin: "center",
    //         }
    //       : { display: "none" }
    //   }
    // >
    //   <HStack w="100%" justifyContent="space-between">
    //     <Text variant="subTitle">{t(data.name)}</Text>
    //     {data.type === 1 &&
    //       !(
    //         paymentDetails?.subscriptionStatus === 1 &&
    //         paymentDetails?.subscribedPlan === data.type
    //       ) && (
    //         <Text
    //           variant="description"
    //           bg="#f9cd65"
    //           textTransform="uppercase"
    //           padding="2px"
    //           borderRadius="5px"
    //           px="5px"
    //           color="black"
    //           transform={"scale(0.8)"}
    //         >
    //           Best Choice
    //         </Text>
    //       )}
    //   </HStack>
    //   <VStack alignItems="flex-start" justifyContent="flex-start">
    //     {/* {data.type === 0 && (
    //       <Heading
    //         variant='tertiary'
    //         fontWeight={600}
    //         fontSize={{ base: '1.7rem' }}
    //         pos='relative'
    //         color='rgba(0,0,0,0.5)'
    //         textDecoration='line-through'
    //       >
    //         {t('home.pricing.aed')} <span>{400}</span>
    //       </Heading>
    //     )} */}
    //     <Heading
    //       variant="tertiary"
    //       fontWeight={600}
    //       fontSize={{ base: "2rem", sm: "2.5rem" }}
    //     >
    //       {t("home.pricing.aed")} {t(data.price)}
    //       {""}
    //       <Text as="span" variant="highlight" color="text.black.200">
    //         /{t(data.validity)}
    //       </Text>
    //     </Heading>
    //   </VStack>
    //   <Text variant="description">{t(data.subTitle)}</Text>
    //   <Button
    //     w="100%"
    //     bgGradient={`linear(95deg, #${data.buttonGradient[0]} 0%, #${data.buttonGradient[1]} 50%)`}
    //     _hover={{
    //       bgGradient: `linear(95deg, #${data.buttonGradient[0]} 0%, #${data.buttonGradient[1]} 50%)`,
    //       boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
    //       transform: "scale(1.02)",
    //     }}
    //     color="black"
    //     border="1px solid #855FFF"
    //     onClick={handlePayment}
    //     isDisabled={loading && data.type !== typeSelected}
    //     isLoading={loading && data.type === typeSelected}
    //   >
    //     Get Started
    //   </Button>

    //   <VStack alignItems="flex-start" gap="1rem">
    //     <Text variant="description" fontWeight={600}>
    //       All the benefits:
    //     </Text>
    //     <VStack alignItems="flex-start" bg="white">
    //       {data?.features?.map((item, index) => (
    //         <AnimatedHStack
    //           initial={{ opacity: 0, x: -50 }}
    //           whileInView={{
    //             opacity: 1,
    //             x: 0,
    //             transition: { delay: 0.2 * index, duration: 0.3 },
    //           }}
    //           key={item.id}
    //           justifyContent="flex-start"
    //           alignItems="flex-start"
    //         >
    //           <Icon
    //             as={item.isAvailable ? TiTick : RiCloseFill}
    //             color={
    //               item.isAvailable ? "semantic.success" : "semantic.failure"
    //             }
    //             mt="5px"
    //           />
    //           <Text
    //             fontSize={{ base: "0.8rem", sm: "0.9rem", xl: "1rem" }}
    //             textDecoration={!item.isAvailable ? "line-through" : "none"}
    //             opacity={!item.isAvailable ? 0.5 : 1}
    //             textAlign="left"
    //             color="text.black.800"
    //           >
    //             {t(item.feature)}
    //           </Text>
    //         </AnimatedHStack>
    //       ))}
    //     </VStack>
    //   </VStack>
    // </VStack>
  );
}
