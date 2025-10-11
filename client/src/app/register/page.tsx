"use client";
import Stepper from "@/components/atoms/stepper";
import React, { useState } from "react";
import BasicDetails from "./sections/BasicDetails";
import ChildrenAge from "./sections/ChildrenAge";
import AdditionalDetails from "./sections/AdditionalDetails";
import Image from "@/components/atoms/NextImageWrapper/Image";
import registerBanner from "@/assets/images/AuthPages/register-banner.png";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  IAdditionalDetails,
  IBasicForm,
} from "@/types/components/authenticationForm/authenticationForms.types";
import { registerUser } from "@/lib/features/auth/authAction";
import { useRouter } from "next/navigation";

export default function register() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const redirection = useAppSelector((state) => state.utils.redirection);
  const [currentStep, setStep] = useState(1);
  const [basicDetails, setBasicDetails] = useState({});
  const [childrenAge, setChildrenAge] = useState("");
  const [additionalRequirement, setAdditionalRequirements] = useState({});

  const registerUserFn = async (additionalRequirement: any) => {
    const data = {
      first_name: (basicDetails as IBasicForm)?.firstName,
      email: (basicDetails as IBasicForm)?.email,
      phone: (basicDetails as IBasicForm)?.phone,
      password: (basicDetails as IBasicForm)?.password,
      confirm_password: (basicDetails as IBasicForm)?.password,
      emirate_of_residence: (basicDetails as IBasicForm)?.emiratesOfResidance,
      position_required: (basicDetails as IBasicForm)?.positionRequired,
      proposed_salary: (additionalRequirement as IAdditionalDetails)
        .proposedSalary,
      area: (additionalRequirement as IAdditionalDetails).area,
      number_of_family: (additionalRequirement as IAdditionalDetails)
        .numOfFamily,
      accomodation_type: (additionalRequirement as IAdditionalDetails)
        .accomodationType,
      heared_from: (additionalRequirement as IAdditionalDetails).hearedFrom,
      nationality_preference: (additionalRequirement as IAdditionalDetails)
        .nationalityPreference,
      additional_requirement: (additionalRequirement as IAdditionalDetails)
        .additionalRequirement,
      child_category: childrenAge,
    };

    const user: any = await dispatch(registerUser({ body: data, redirection }));
    if (
      user.type === "auth/register-user/fulfilled" &&
      user.meta?.arg?.redirection
    ) {
      router.push(user.meta?.arg?.redirection);
    } else {
      router.push("/");
    }
    console.log(user, "this is user");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="common-padding flex flex-col gap-[1rem] pb-[2rem]">
        <h1 className="heading-section-title text-left! w-[100%]">
          Account Registration
        </h1>
        <p className="text-description">
          Please complete the form below to create your account. After
          registration, you may select a payment plan to access maid contacts.
        </p>

        <div className="flex flex-col gap-[1rem]">
          <Stepper steps={3} activeStep={currentStep} />
          {currentStep === 1 ? (
            <BasicDetails
              setStep={setStep}
              basicDetails={basicDetails}
              setBasicDetails={setBasicDetails}
            />
          ) : currentStep === 2 ? (
            <ChildrenAge
              setStep={setStep}
              childrenAge={childrenAge}
              setChildrenAge={setChildrenAge}
            />
          ) : currentStep === 3 ? (
            <AdditionalDetails
              setStep={setStep}
              additionalRequirement={additionalRequirement}
              setAdditionalRequirement={setAdditionalRequirements}
              registerUser={registerUserFn}
            />
          ) : null}
        </div>

        <p
          className="text-fade cursor-pointer hover:underline w-[100%] text-center pt-[1rem]"
          onClick={() => dispatch(setAuthModal("login"))}
        >
          Already have an account?
        </p>
      </div>
      <div className="none md:block">
        <Image
          src={registerBanner.src}
          alt="Quality Maids in Pickmymaid"
          className="w-[100%] h-[100%] object-cover object-center filter brightness-[0.7]"
          parentClass="w-[100%] h-[100%]"
        />
      </div>
    </div>
  );
}
