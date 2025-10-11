"use client";
import PhoneInputField from "@/components/atoms/InputFields/PhoneInput/PhoneInputField";
import PrimaryInput from "@/components/atoms/InputFields/PrimaryInput/PrimaryInput";
import SelectInput from "@/components/atoms/InputFields/SelectInput/SelectInput";
import regularExpressions from "@/lib/regularExpressions";
import { IBasicForm } from "@/types/components/authenticationForm/authenticationForms.types";
import React from "react";
import { useForm } from "react-hook-form";

export default function BasicDetails({
  setStep,
  basicDetails,
  setBasicDetails,
}: {
  setStep: any;
  basicDetails: any;
  setBasicDetails: any;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IBasicForm>({
    mode: "onChange",
    defaultValues: basicDetails || {},
  });

  const onSubmit = (data: IBasicForm) => {
    setStep(2);
    setBasicDetails(data);
  };

  console.log(basicDetails, "this is basic details");
  return (
    <div className="flex flex-col gap-[1rem]">
      <div>
        <p>Fill your registration details</p>
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <div className="sm:flex gap-[0.5rem]">
          <PrimaryInput
            register={register("firstName", {
              required: "Fullname is required!",
            })}
            label="Fullname"
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
            label="Email"
            required
            errorMessage={errors?.email?.message}
            placeholder="johndoe@gmail.com"
          />
        </div>

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
          label="Password"
          required
          errorMessage={errors?.password?.message}
        />

        <div className="flex sm:flex-row flex-col gap-[0.5rem]">
          <SelectInput
            label="Emirate of residence"
            list={[
              { id: "1", option: "Abu Dhabi", value: "Abu Dhabi" },
              { id: "2", option: "Dubai", value: "Dubai" },
              { id: "3", option: "Sharjah", value: "Sharjah" },
              { id: "4", option: "Ajman", value: "Ajman" },
              { id: "5", option: "Umm Al Quwain", value: "Umm Al Quwain" },
              { id: "6", option: "Ras Al Khaimah", value: "Ras Al Khaimah" },
              { id: "7", option: "Fujairah", value: "Fujairah" },
            ]}
            register={register("emiratesOfResidance", {
              required: "Emirate of residence is required!",
            })}
            errorMessage={errors?.emiratesOfResidance?.message}
            required
          />

          <SelectInput
            label="Position required"
            list={[
              { id: "1", option: "Nanny", value: "Nanny" },
              { id: "2", option: "Maid", value: "Maid" },
              { id: "3", option: "Caregiver", value: "Caregiver" },
              { id: "4", option: "Private Nurse", value: "Private Nurse" },
              { id: "5", option: "Private Tutor", value: "Private Tutor" },
              { id: "6", option: "Driver", value: "Driver" },
              { id: "7", option: "Postpartum care", value: "Postpartum care" },
              { id: "8", option: "Cook", value: "Cook" },
            ]}
            register={register("positionRequired", {
              required: "Position required is required!",
            })}
            errorMessage={errors?.positionRequired?.message}
            required
          />
        </div>
      </div>
      <div className="flex justify-between mt-[1rem]">
        <button
          className="btn-outlined ml-auto"
          onClick={handleSubmit(onSubmit)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
