import { Button, HStack, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { IPricingCardData } from "@/types/components/pricingSection/pricingSection.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { generatePaymentLink } from "@/lib/features/payment/paymentAction";
import useCustomToast from "@/lib/hooks/useCustomToast";
import {
  resetPaymentLink,
  resetState,
  setPaymentTypeSelected,
} from "@/lib/features/payment/paymentSlice";
import {
  addPaymentType,
  addRedirection,
} from "@/lib/features/utilSlice/utileSlice";
import { RiCloseFill, TiTick } from "@/components/atoms/Icons/Icons";
import { setAuthModal } from "@/lib/features/auth/authSlice";

const AnimatedHStack = motion(HStack);

export default function PricingCard({
  data,
  isActive,
  highlightColor,
}: {
  data: IPricingCardData;
  isActive: boolean;
  highlightColor: string;
}) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const user = useAppSelector((state) => state?.auth?.user);
  const paymentLink = useAppSelector((state) => state?.payment?.paymentLink);
  const loading = useAppSelector((state) => state?.payment?.loading);
  const status = useAppSelector((state) => state?.payment?.status);
  const message = useAppSelector((state) => state?.payment?.message);
  const typeSelected = useAppSelector((state) => state?.payment?.selectedType);
  const paymentDetails = useAppSelector(
    (state) => state?.payment?.paymentDetails
  );

  // log
  const handlePayment = () => {
    if (user) {
      dispatch(setPaymentTypeSelected(data.type));
      dispatch(generatePaymentLink(data.type));
    } else {
      // navigate('/login');
      // toast('Ugh no!', 'Please login before subscribing', 'error');
      // onOpen();
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
      border="1px solid"
      borderColor="brand.primary.300"
      borderRadius="0 20px 0 20px"
      overflow="hidden"
      w="100%"
      transform={isActive ? { base: "scale(1)", sm: "scale(1.1)" } : "scale(1)"}
      boxShadow={isActive ? " 0px 4px 20px rgba(0, 0, 0, 0.08)" : "none"}
      gap={{ base: 4, sm: 8 }}
      pb={4}
      bg="white"
      transition="all 0.3s ease"
      maxW="20rem"
      _hover={{
        transform: {
          base: "scale(1.02)",
          md: isActive ? "scale(1.05)" : "scale(1.1)",
        },
      }}
    >
      <VStack
        bg={highlightColor}
        w="100%"
        py={4}
        color="white"
        pos="relative"
        _before={
          paymentDetails?.subscriptionStatus === 1 &&
          paymentDetails?.subscribedPlan === data.type
            ? {
                content: `'Active'`,
                bg: "white",
                color: highlightColor,
                padding: "0 3rem",
                pos: "absolute",
                left: 0,
                top: 0,
                transform: "translateX(-40%) rotate(-45deg) translateY(70%)",
                transformOrigin: "center",
              }
            : { display: "none" }
        }
      >
        <Heading
          fontSize={{ base: "1.2rem", sm: "1.3rem", md: "1.5rem" }}
          textAlign="center"
          fontWeight={500}
          color="white"
        >
          {t(data.name)}
        </Heading>
        <Heading fontSize={{ base: "2rem", sm: "2.5rem" }}>
          {t("home.pricing.aed")} {t(data.price)}
        </Heading>
      </VStack>
      <VStack alignItems="flex-start" p={{ base: 2, sm: 4 }} bg="white">
        {data?.features?.map((item, index) => (
          <AnimatedHStack
            initial={{ opacity: 0, x: -50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.2 * index, duration: 0.3 },
            }}
            key={item.id}
            justifyContent="flex-start"
          >
            <Icon
              as={item.isAvailable ? TiTick : RiCloseFill}
              color={item.isAvailable ? "semantic.success" : "semantic.failure"}
            />
            <Text
              fontSize={{ base: "0.8rem", sm: "0.9rem", xl: "1rem" }}
              textDecoration={!item.isAvailable ? "line-through" : "none"}
              opacity={!item.isAvailable ? 0.5 : 1}
              textAlign="left"
              color="text.black.800"
            >
              {t(item.feature)}
            </Text>
          </AnimatedHStack>
        ))}
      </VStack>
      {paymentDetails?.subscriptionStatus !== 1 && (
        <Button
          variant="outlined"
          mt="auto"
          borderRadius="0 20px 0 20px"
          w="90%"
          borderWidth="1px"
          fontWeight={500}
          onClick={handlePayment}
          isDisabled={loading && data.type !== typeSelected}
          isLoading={loading && data.type === typeSelected}
        >
          {t("common.button.getStarted")}
        </Button>
      )}
    </VStack>
  );
}
