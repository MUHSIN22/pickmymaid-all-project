import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IJobApplicationForm } from "@/types/components/authenticationForm/authenticationForms.types";
import PrimaryInput from "@/components/atoms/InputFields/PrimaryInput/PrimaryInput";
import PhoneInputField from "@/components/atoms/InputFields/PhoneInput/PhoneInputField";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { applyForJob } from "@/lib/features/maid/maidAction";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { resetMaidState } from "@/lib/features/maid/maidSlice";

export default function JobApplicationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IJobApplicationForm>({ mode: "onChange" });

  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const router = useRouter();

  const loading = useAppSelector((state) => state?.maid?.loading);
  const status = useAppSelector((state) => state?.maid?.status);
  const message = useAppSelector((state) => state?.maid?.message);

  // Function for handling the submission
  const onFormSubmission = async (data: IJobApplicationForm) => {
    await dispatch(applyForJob({ body: data }));
  };

  useEffect(() => {
    if (status !== "idle" && message) {
      toast(
        status === "success" ? "Great!" : "Ugh no!",
        message,
        status === "success" ? "success" : "error"
      );
      router.push("/");
      dispatch(resetMaidState());
    }
  }, [status]);

  return (
    <Box>
      <Heading variant="tertiary" mb={4}>
        Apply for Job
      </Heading>
      <VStack gap={{ base: 0, sm: 4 }}>
        <PrimaryInput
          register={register("name", { required: "This field is required" })}
          label="Name"
          errorMessage={errors?.name?.message}
          placeholder="John Doe"
          required
        />
        <PrimaryInput
          register={register("email")}
          label="Email"
          type="email"
          errorMessage={errors?.email?.message}
          placeholder="johndoe@gmail.com"
        />
        <PhoneInputField
          control={control}
          name="mobile"
          rules={{ required: "This field is required" }}
          required
          isUAEOnly
        />
        <Button
          variant="solid"
          w="100%"
          my={2}
          onClick={handleSubmit(onFormSubmission)}
          isLoading={loading}
        >
          Register
        </Button>
      </VStack>
    </Box>
  );
}
