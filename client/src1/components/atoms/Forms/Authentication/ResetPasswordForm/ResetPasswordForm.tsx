"use client";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import PrimaryInput from "../../../InputFields/PrimaryInput/PrimaryInput";
import { IResetPassword } from "../../../../../types/components/authenticationForm/authenticationForms.types";
import { useAppSelector, useAppDispatch } from "../../../../../lib/hooks";
import { IResetPasswordBody } from "../../../../../types/features/auth/auth.types";
import { resetPassword } from "../../../../../lib/features/auth/authAction";
import { setAuthModal } from "../../../../../lib/features/auth/authSlice";
import VStack from "../../../../ui/VStack";
import Button from "../../../../ui/Button";

export default function ResetPasswordForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IResetPassword>({ mode: "onChange" });
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loading = useAppSelector((state) => state.auth.loading);
  const status = useAppSelector((state) => state.auth.status);

  const onFormSubmission = (data: IResetPassword) => {
    const body: IResetPasswordBody = {
      confirm_password: data.confirmPassword,
      password: data.password,
    };
    dispatch(resetPassword({ body, token: id as string }));
  };

  useEffect(() => {
    if (status === "success") {
      router.push("/");
      dispatch(setAuthModal("login-form"));
    }
  }, [status]);

  return (
    <div className="w-[100%] sm:w-[50%]">
      <h3 className="heading-tertiary">Reset Password</h3>
      <VStack className="items-center sm:gap-4">
        <PrimaryInput
          register={register("password", {
            required: "Password is required!",
          })}
          type="password"
          label="Password"
          required
          errorMessage={errors?.password?.message}
        />
        <PrimaryInput
          register={register("confirmPassword", {
            required: "This field is required!",
          })}
          type="password"
          label="Confirm Password"
          required
          errorMessage={errors?.confirmPassword?.message}
        />
        <Button
          className="btn-solid w-[100%] my-2"
          onClick={handleSubmit(onFormSubmission)}
          isLoading={loading}
        >
          Submit
        </Button>
      </VStack>
    </div>
    // <Box w="100%">
    //   <Heading variant="tertiary" mb={4}>
    //     Reset Password
    //   </Heading>
    //   <VStack gap={{ base: 0, sm: 4 }}>
    //     <PrimaryInput
    //       register={register("password", {
    //         required: "Password is required!",
    //       })}
    //       type="password"
    //       label="Password"
    //       required
    //       errorMessage={errors?.password?.message}
    //     />
    //     <PrimaryInput
    //       register={register("confirmPassword", {
    //         required: "This field is required!",
    //       })}
    //       type="password"
    //       label="Confirm Password"
    //       required
    //       errorMessage={errors?.confirmPassword?.message}
    //     />
    //     <Button
    //       variant="solid"
    //       w="100%"
    //       my={2}
    //       onClick={handleSubmit(onFormSubmission)}
    //       isLoading={loading}
    //     >
    //       Submit
    //     </Button>
    //   </VStack>
    // </Box>
  );
}
