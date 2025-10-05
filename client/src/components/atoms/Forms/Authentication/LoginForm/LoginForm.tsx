"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import OAuth from "../OAuth/OAuth";
import { MdArrowBackIos } from "../../../Icons/Icons";
import { ILoginForm } from "@/types/components/authenticationForm/authenticationForms.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ILoginBodyState } from "@/types/features/auth/auth.types";
import { loginUser } from "@/lib/features/auth/authAction";
import regularExpressions from "@/lib/regularExpressions";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import HStack from "@/components/ui/HStack";
import VStack from "@/components/ui/VStack";
import PrimaryInput from "@/components/atoms/InputFields/PrimaryInput/PrimaryInput";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

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
    <div className="flex flex-col w-[100%] items-start gap-4">
      <HStack className="items-center">
        {isCustom === "email" && (
          <MdArrowBackIos
            className="w-6 cursor-pointer"
            onClick={() => setCustom(null)}
          />
        )}
        <h2 className="heading-tertiary">Login to your account</h2>
      </HStack>

      <p className="text-fade">
        After Registration, Select a Payment Plan to Access Maids Contacts
      </p>

      {isCustom === "email" ? (
        <VStack className="gap-2 sm:gap-4 items-center pt-[1rem] w-[100%]">
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
          <PrimaryInput
            register={register("password", {
              required: "Password is required!",
            })}
            type="password"
            label="Password"
            required
            errorMessage={errors?.password?.message}
          />
          <Button
            className="btn-solid w-[100%]"
            onClick={handleSubmit(onFormSubmission)}
            isLoading={loading}
          >
            Login
          </Button>
          <p
            className="text-fade cursor-pointer hover:underline"
            onClick={() => dispatch(setAuthModal("forget"))}
          >
            Did you forget password?
          </p>
          <p
            className="text-fade cursor-pointer hover:underline"
            onClick={() => dispatch(setAuthModal("signup"))}
          >
            Don&apos;t have an account?
          </p>
        </VStack>
      ) : (
        <OAuth setCustom={setCustom} />
      )}
    </div>
  );
}
