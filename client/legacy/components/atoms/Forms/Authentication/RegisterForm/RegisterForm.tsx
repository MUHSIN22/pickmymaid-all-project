import { Button, HStack, Heading, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import PrimaryInput from "../../../InputFields/PrimaryInput/PrimaryInput";
import { regularFont } from "../../../styles";
import PhoneInputField from "../../../InputFields/PhoneInput/PhoneInputField";
import OAuth from "../OAuth/OAuth";
import { MdArrowBackIos } from "../../../Icons/Icons";
import { IRegisterForm } from "@/types/components/authenticationForm/authenticationForms.types";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { IRegisterBodyState } from "@/types/features/auth/auth.types";
import { registerUser } from "@/lib/features/auth/authAction";
import { setPaymentTypeSelected } from "@/lib/features/payment/paymentSlice";
import { generatePaymentLink } from "@/lib/features/payment/paymentAction";
import { resetAuthState, setAuthModal } from "@/lib/features/auth/authSlice";
import { resetRedirection } from "@/lib/features/utilSlice/utileSlice";
import regularExpressions from "@/lib/regularExpressions";

export default function RegisterForm({ isPopup }: { isPopup?: boolean; onClose?: any }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegisterForm>({ mode: "onChange" });

  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const [isCustom, setCustom] = useState<string | null>(null);

  const status = useAppSelector((state) => state.auth.status);
  const loading = useAppSelector((state) => state.auth.loading);
  const redirection = useAppSelector((state) => state?.utils?.redirection);
  const paymentType = useAppSelector((state) => state?.utils?.paymentType);
  const { paymentDetails } = useAppSelector((state) => state.payment);

  const onFormSubmission = (data: IRegisterForm) => {
    const body: IRegisterBodyState = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirm_password: data.confirmPassword,
    };
    dispatch(registerUser({ body }));
  };

  useMemo(() => {
    console.log({ redirection, status });

    if (!paymentDetails?.subscribedPlan && redirection) {
      if (status === "success") {
        if (redirection === "payment" && (paymentType === 1 || paymentType === 0 || paymentType === 2)) {
          dispatch(setPaymentTypeSelected(paymentType));
          dispatch(generatePaymentLink(paymentType));
          dispatch(resetAuthState());
        } else if (isPopup && redirection !== "/pricing") {
          router?.replace(pathname);
          dispatch(resetAuthState());
        } else if (redirection) {
          toast("Great!", "Subscribe for unlock contact details", "info");
          router.replace(redirection === "payment" ? "/pricing" : redirection);
          dispatch(resetAuthState());
          dispatch(resetRedirection());
          window.location.reload();
          localStorage.setItem("isUnlock", "");
        } else {
          router.replace("/");
        }
      }
    }
  }, [status, redirection]);

  return (
    <VStack
      w="100%"
      gap="1rem"
      alignItems="flex-start">
      <HStack>
        {isCustom === "email" && (
          <Icon
            as={MdArrowBackIos}
            fontSize="1.5rem"
            cursor="pointer"
            onClick={() => setCustom(null)}
          />
        )}
        <Heading variant="tertiary">{t("auth.registerTitle")}</Heading>
      </HStack>
      <Text variant="fade">After Registration, Select a Payment Plan to Access Maids Contacts</Text>
      {isCustom === "email" ? (
        <VStack
          gap={{ base: 0, sm: isPopup ? 0 : 4 }}
          w="100%">
          <PrimaryInput
            register={register("firstName", {
              required: "Full Name is required!",
            })}
            label={t("common.form.fullname")}
            required
            errorMessage={errors?.firstName?.message}
            placeholder="John"
          />
          <PrimaryInput
            register={register("email", {
              required: "Email is required!",
              pattern: {
                value: regularExpressions.isEmail,
                message: "Invalid Email ID",
              },
            })}
            type="email"
            label={t("common.email")}
            required
            errorMessage={errors?.email?.message}
            placeholder="johndoe@gmail.com"
          />

          <PhoneInputField
            control={control}
            name="phone"
            rules={{ required: "This field is required" }}
            required
          />

          <PrimaryInput
            register={register("password", {
              required: "Password is required!",
              min: {
                value: 6,
                message: "Password should be 6 or more characters",
              },
            })}
            type="password"
            label={t("common.form.password")}
            required
            errorMessage={errors?.password?.message}
          />
          <Button
            variant="solid"
            w="100%"
            my={2}
            onClick={handleSubmit(onFormSubmission)}
            isLoading={loading}>
            {t("common.register")}
          </Button>
          <Link
            onClick={() => dispatch(setAuthModal("login"))}
            sx={regularFont}
            color="text.black.500">
            {t("auth.alreadyHave")}
          </Link>
        </VStack>
      ) : (
        <OAuth setCustom={setCustom} />
      )}
    </VStack>
  );
}
