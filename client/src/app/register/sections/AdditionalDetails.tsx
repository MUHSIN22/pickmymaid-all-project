"use client";
import PrimaryInput from "@/components/atoms/InputFields/PrimaryInput/PrimaryInput";
import SelectInput from "@/components/atoms/InputFields/SelectInput/SelectInput";
import { IAdditionalDetails } from "@/types/components/authenticationForm/authenticationForms.types";
import React from "react";
import { useForm } from "react-hook-form";

export default function AdditionalDetails({
  setStep,
  additionalRequirement,
  setAdditionalRequirement,
  registerUser,
}: {
  setStep: any;
  additionalRequirement: any;
  setAdditionalRequirement: any;
  registerUser: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdditionalDetails>({
    mode: "onChange",
    defaultValues: additionalRequirement || {},
  });

  const onSubmit = (data: IAdditionalDetails) => {
    setAdditionalRequirement(data);
    registerUser(data);
  };
  return (
    <div className="flex flex-col gap-[1rem]">
      <div>
        <p>Add More Details to Improve Profile Matching</p>
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <SelectInput
          label="Proposed Salary"
          list={[
            { id: "1", option: "1200-1500", value: "1200-1500" },
            { id: "2", option: "1500-1800", value: "1200-1800" },
            { id: "3", option: "1800-2000", value: "1200-2000" },
            { id: "4", option: "2000-2200", value: "2000-2200" },
            { id: "5", option: "2200-2500", value: "2200-2500" },
            { id: "6", option: "2500+", value: "2500+" },
          ]}
          register={register("proposedSalary", {
            required: "Proposed salary is required",
          })}
          errorMessage={errors?.proposedSalary?.message}
          required
        />
        <PrimaryInput
          register={register("area", {
            required: "Area/location is required!",
          })}
          label="Area/location"
          required
          errorMessage={errors?.area?.message}
          placeholder="Sharja, Dubai"
        />
        <PrimaryInput
          register={register("numOfFamily", {
            required: "Number of family members is required!",
          })}
          label="Number of family members"
          required
          errorMessage={errors?.numOfFamily?.message}
          placeholder="10"
        />
        <SelectInput
          label="Accomodation Type"
          list={[
            { id: "1", option: "Flat", value: "Flat" },
            { id: "2", option: "Villa", value: "Villa" },
          ]}
          register={register("accomodationType", {
            required: "Accomodation type is required",
          })}
          errorMessage={errors?.accomodationType?.message}
          required
        />
        <SelectInput
          label="Nationality Preference"
          list={[
            { id: "1", option: "Philippines", value: "Philippines" },
            { id: "2", option: "India", value: "India" },
            { id: "3", option: "Nepal", value: "Nepal" },
            { id: "4", option: "Indonesia", value: "Indonesia" },
            { id: "5", option: "Bangladesh", value: "Bangladesh" },
            { id: "6", option: "Pakistan", value: "Pakistan" },
            { id: "7", option: "Myanmar", value: "Myanmar" },
            { id: "8", option: "Bhutan", value: "Bhutan" },
            { id: "9", option: "Sri Lanka", value: "Sri Lanka" },
            { id: "10", option: "Ethiopia", value: "Ethiopia" },
            { id: "11", option: "Eritrea", value: "Eritrea" },
          ]}
          register={register("nationalityPreference")}
          errorMessage={errors?.nationalityPreference?.message}
        />
        <SelectInput
          label="How did you hear about us?"
          list={[
            { id: "1", option: "Google Search", value: "Google Search" },
            { id: "2", option: "Social Media", value: "Social Media" },
            { id: "3", option: "Friend or Family", value: "Friend or Family" },
            { id: "4", option: "Advertisement", value: "Advertisement" },
            { id: "5", option: "Website", value: "Website" },
            { id: "6", option: "Event or Seminar", value: "Event or Seminar" },
            { id: "7", option: "Other", value: "Other" },
          ]}
          register={register("hearedFrom")}
          errorMessage={errors?.hearedFrom?.message}
        />
        <PrimaryInput
          register={register("additionalRequirement")}
          label="Additional Requirements"
          placeholder=""
          type="textarea"
          errorMessage={errors?.additionalRequirement?.message}
        />
      </div>
      <div className="flex justify-between mt-[1rem]">
        <button
          className="btn-ghost cursor-pointer"
          disabled={false}
          onClick={() => setStep(2)}
        >
          Back
        </button>
        <button
          className="btn-outlined ml-auto"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
