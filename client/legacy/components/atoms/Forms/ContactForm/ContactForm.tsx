import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { IContactForm } from "@/types/components/contactFormTypes/contactForm.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { saveContact } from "@/lib/features/contact/contactAction";
import PrimaryInput from "@/components/atoms/InputFields/PrimaryInput/PrimaryInput";
import PhoneInputField from "@/components/atoms/InputFields/PhoneInput/PhoneInputField";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IContactForm>({ mode: "onChange" });

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const status = useAppSelector((state) => state?.contact?.status);
  const message = useAppSelector((state) => state?.contact?.message);
  const loading = useAppSelector((state) => state?.contact?.loading);

  // Handle the submission of the form
  const onFormSubmission = async (data: IContactForm) => {
    console.log({ data });
    await dispatch(saveContact({ body: data }));
  };

  useMemo(() => {
    if (status !== "idle" && message) {
      if (status === "success") {
        toast("Great!", message, "success");
        reset({
          email: "",
          message: "",
          mobile: "",
          name: "",
        });
      } else {
        toast("Ugh no!", message, "error");
      }
    }
  }, [status]);

  return (
    <Box
      maxW={{ base: "100%", lg: "30rem" }}
      h="max-content">
      <Box mb={4}>
        <Heading
          variant="tertiary"
          mb={2}>
          {t("contact.title")}
        </Heading>
        <Text variant="fade">{t("contact.subTitle")}</Text>
      </Box>

      <VStack>
        <PrimaryInput
          label={t("common.form.fullname")}
          register={register("name", { required: "This field is required" })}
          errorMessage={errors?.name?.message}
          placeholder="John Doe"
          required
        />
        <PhoneInputField
          control={control}
          name="mobile"
          rules={{ required: "This field is required" }}
          required
        />
        <PrimaryInput
          label={t("common.email")}
          register={register("email", { required: "This field is required" })}
          errorMessage={errors?.email?.message}
          placeholder="johndoe@gmail.com"
          required
          type="email"
        />
        <PrimaryInput
          label={t("common.message")}
          register={register("message")}
          placeholder="Write your message..."
          errorMessage={errors?.message?.message}
          type="textarea"
        />
        <Button
          variant="solid"
          isLoading={loading}
          onClick={handleSubmit(onFormSubmission)}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
}
