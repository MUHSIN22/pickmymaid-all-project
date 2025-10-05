import { Button, HStack, Heading, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useEffect, useState } from "react";
import PrimaryInput from "../../../InputFields/PrimaryInput/PrimaryInput";
import { regularFont } from "../../../styles";
import OAuth from "../OAuth/OAuth";
import { MdArrowBackIos } from "../../../Icons/Icons";
import { ILoginForm } from "@/types/components/authenticationForm/authenticationForms.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ILoginBodyState } from "@/types/features/auth/auth.types";
import { loginUser } from "@/lib/features/auth/authAction";
import regularExpressions from "@/lib/regularExpressions";
import { setAuthModal } from "@/lib/features/auth/authSlice";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isCustom, setCustom] = useState<string | null>(null);

  const { loading, authModal } = useAppSelector((state) => state.auth);

  const onFormSubmission = async (data: ILoginForm) => {
    const body: ILoginBodyState = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginUser({ body }));
  };

  useEffect(() => {
    if (authModal === "login-form") {
      setCustom("email");
    }
  }, [authModal]);

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
        <Heading variant="tertiary">{t("auth.signInTitle")}</Heading>
      </HStack>
      <Text variant="fade">After Registration, Select a Payment Plan to Access Maids Contacts</Text>
      {isCustom === "email" ? (
        <VStack
          gap={{ base: 2, sm: 4 }}
          pt="1rem"
          w="100%">
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
          <PrimaryInput
            register={register("password", {
              required: "Password is required!",
            })}
            type="password"
            label={t("common.form.password")}
            required
            errorMessage={errors?.password?.message}
          />
          <Button
            variant="solid"
            w="100%"
            isLoading={loading}
            onClick={handleSubmit(onFormSubmission)}>
            {t("common.button.login")}
          </Button>
          <Link
            onClick={() => dispatch(setAuthModal("forget"))}
            color="text.black.500"
            sx={regularFont}>
            {t("auth.forgetPasswordQuestion")}
          </Link>
          <Link
            onClick={() => dispatch(setAuthModal("signup"))}
            color="text.black.500"
            sx={regularFont}>
            {t("auth.noAccount")}
          </Link>
        </VStack>
      ) : (
        <OAuth setCustom={setCustom} />
      )}
    </VStack>
  );
}
