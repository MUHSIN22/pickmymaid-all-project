"use client";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { IContactForm } from "../../../../types/components/contactFormTypes/contactForm.types";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks";
import useCustomToast from "../../../../lib/hooks/useCustomToast";
import { saveContact } from "../../../../lib/features/contact/contactAction";
import VStack from "../../../ui/VStack";
import PrimaryInput from "../../InputFields/PrimaryInput/PrimaryInput";
import PhoneInputField from "../../InputFields/PhoneInput/PhoneInputField";
import Button from "../../../ui/Button";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IContactForm>({ mode: "onChange" });

  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const status = useAppSelector((state) => state?.contact?.status);
  const message = useAppSelector((state) => state?.contact?.message);
  const loading = useAppSelector((state) => state?.contact?.loading);

  // Handle the submission of the form
  const onFormSubmission = async (data: IContactForm) => {
    await dispatch(saveContact({ body: data }));
  };

  useMemo(() => {
    console.log(status, "statuss");
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
    <div className="max-w-[100%] lg:max-w-[30rem] h-max">
      <div className="mb-4">
        <h3 className="heading-tertiary mb-2">Get in touch</h3>
        <p className="text-description">
          Have an inquiry or some feedback for us? Fill out the form below to
          contact our team
        </p>
      </div>
      <VStack>
        <PrimaryInput
          label="Name"
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
          label="Email"
          register={register("email", { required: "This field is required" })}
          errorMessage={errors?.email?.message}
          placeholder="johndoe@gmail.com"
          required
          type="email"
        />
        <PrimaryInput
          label="Message"
          register={register("message")}
          placeholder="Write your message..."
          errorMessage={errors?.message?.message}
          type="textarea"
        />
        <Button
          className="w-full btn-solid"
          isLoading={loading}
          onClick={handleSubmit(onFormSubmission)}
        >
          Submit
        </Button>
      </VStack>
    </div>
    // <Box maxW={{ base: "100%", lg: "30rem" }} h="max-content">
    //   <Box mb={4}>
    //     <Heading variant="tertiary" mb={2}>
    //       {t("contact.title")}
    //     </Heading>
    //     <Text variant="fade">{t("contact.subTitle")}</Text>
    //   </Box>

    //   <VStack>
    //     <PrimaryInput
    //       label={t("common.form.fullname")}
    //       register={register("name", { required: "This field is required" })}
    //       errorMessage={errors?.name?.message}
    //       placeholder="John Doe"
    //       required
    //     />
    //     <PhoneInputField
    //       control={control}
    //       name="mobile"
    //       rules={{ required: "This field is required" }}
    //       required
    //     />
    //     <PrimaryInput
    //       label={t("common.email")}
    //       register={register("email", { required: "This field is required" })}
    //       errorMessage={errors?.email?.message}
    //       placeholder="johndoe@gmail.com"
    //       required
    //       type="email"
    //     />
    //     <PrimaryInput
    //       label={t("common.message")}
    //       register={register("message")}
    //       placeholder="Write your message..."
    //       errorMessage={errors?.message?.message}
    //       type="textarea"
    //     />
    //     <Button
    //       variant="solid"
    //       isLoading={loading}
    //       onClick={handleSubmit(onFormSubmission)}
    //     >
    //       Submit
    //     </Button>
    //   </VStack>
    // </Box>
  );
}
