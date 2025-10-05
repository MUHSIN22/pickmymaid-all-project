import { Box, Button, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import PrimaryInput from "../../../InputFields/PrimaryInput/PrimaryInput";
import { regularFont } from "../../../styles";
import { IForgetPasswordForm } from "@/types/components/authenticationForm/authenticationForms.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { forgetPassword } from "@/lib/features/auth/authAction";
import { useRouter } from "next/navigation";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import regularExpressions from "@/lib/regularExpressions";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPasswordForm>();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

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
    <Box>
      <Heading
        variant="tertiary"
        mb={4}>
        {t("auth.forgetPassTitle")}
      </Heading>
      <VStack gap={{ base: 0, sm: 4 }}>
        <Text variant="description">{t("auth.forgetDescription")}</Text>
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

        <Button
          variant="solid"
          w="100%"
          isLoading={loading}
          onClick={handleSubmit(onFormSubmission)}>
          {t("common.sendLink")}
        </Button>
        <Link
          onClick={() => dispatch(setAuthModal("login"))}
          color="text.black.500"
          sx={regularFont}>
          {t("auth.rememberPassword")}
        </Link>
      </VStack>
    </Box>
  );
}
