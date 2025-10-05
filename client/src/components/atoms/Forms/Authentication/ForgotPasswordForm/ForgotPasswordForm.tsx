"use client";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { IForgetPasswordForm } from "@/types/components/authenticationForm/authenticationForms.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { forgetPassword } from "@/lib/features/auth/authAction";
import { useRouter } from "next/navigation";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import regularExpressions from "@/lib/regularExpressions";
import HStack from "@/components/ui/HStack";
import VStack from "@/components/ui/VStack";
import PrimaryInput from "@/components/atoms/InputFields/PrimaryInput/PrimaryInput";
import Button from "@/components/ui/Button";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPasswordForm>();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const status = useAppSelector((state) => state.auth.status);
  const loading = useAppSelector((state) => state.auth.loading);

  const onFormSubmission = (data: IForgetPasswordForm) => {
    dispatch(forgetPassword({ body: data }));
  };

  useMemo(() => {
    if (status === "success") {
      router.push("/reset-link-sent");
    }
  }, [status]);

  return (
    <div className="flex flex-col w-[100%] items-start gap-4">
      <HStack className="items-center">
        <h2 className="heading-tertiary">Forgot Password?</h2>
      </HStack>

      <p className="text-fade">
        No Worries! we will send you a link to reset your password
      </p>

      <VStack className="sm:gap-4 w-[100%] items-center">
        <PrimaryInput
          register={register("email", {
            required: "Email is required!",
            pattern: {
              value: regularExpressions.isEmail,
              message: "Invalid Email ID",
            },
          })}
          type="email"
          label="Email"
          required
          errorMessage={errors?.email?.message}
          placeholder="johndoe@gmail.com"
        />

        <Button
          className="btn-solid w-[100%]"
          isLoading={loading}
          onClick={handleSubmit(onFormSubmission)}
        >
          Send reset link
        </Button>
        <p
          className="text-fade cursor-pointer hover:underline"
          onClick={() => dispatch(setAuthModal("login"))}
        >
          Remember password? Login
        </p>
      </VStack>
    </div>
    // <Box>
    //   <Heading variant="tertiary" mb={4}>
    //     {t("auth.forgetPassTitle")}
    //   </Heading>
    //   <VStack gap={{ base: 0, sm: 4 }}>
    //     <Text variant="description">{t("auth.forgetDescription")}</Text>
    //     <PrimaryInput
    //       register={register("email", {
    //         required: "Email is required!",
    //         pattern: {
    //           value: regularExpressions.isEmail,
    //           message: "Invalid Email ID",
    //         },
    //       })}
    //       type="email"
    //       label={t("common.email")}
    //       required
    //       errorMessage={errors?.email?.message}
    //       placeholder="johndoe@gmail.com"
    //     />

    //     <Button
    //       variant="solid"
    //       w="100%"
    //       isLoading={loading}
    //       onClick={handleSubmit(onFormSubmission)}
    //     >
    //       {t("common.sendLink")}
    //     </Button>
    //     <Link
    //       onClick={() => dispatch(setAuthModal("login"))}
    //       color="text.black.500"
    //       sx={regularFont}
    //     >
    //       {t("auth.rememberPassword")}
    //     </Link>
    //   </VStack>
    // </Box>
  );
}
