"use client";
import { JSX } from "react";
import { BaselineApple, FcGoogle, MdOutlineMail } from "../../../Icons/Icons";
import VStack from "@/components/ui/VStack";
import { option } from "framer-motion/client";

const authOptions: {
  title: string;
  icon: JSX.Element;
  type: string;
  link?: string;
}[] = [
    {
      title: "Continue with Google",
      icon: <FcGoogle className="w-6" />,
      type: "google",
      link: "auth/google",
    },
    {
      title: "Continue with Apple",
      icon: <BaselineApple className="w-7" />,
      type: "apple",
      link: "auth/apple",
    },
    {
      title: "Continue with Email",
      icon: <MdOutlineMail className="w-6 text-[red]" />,
      type: "email",
    },
  ];

export default function OAuth({ setCustom }: any) {
  const handleOAuth = (type: string, link: string) => {
    const baseURL: string =
      process.env.NEXT_PUBLIC_CUSTOM_MODE === "PROD" ? (process.env.NEXT_PUBLIC_API_URL_PROD as string) : (process.env.NEXT_PUBLIC_API_URL as string);
    if (type === "email") {
      setCustom(type);
      return true;
    }

    setCustom(type);
    // console.log(`${baseURL}v2/${link}?redirect=${encodeURIComponent(location.href)}`);
    window.location.href = `${baseURL}v2/${link}?redirect=${encodeURIComponent(location.href)}`;
  };
  return (
    <VStack className="items-center gap-6 w-full">
      {authOptions.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOAuth(option?.type as string, option?.link as string)}
          className="flex cursor-pointer gap-4 rounded-md items-center bg-[#f2f3f5] hover:bg-[#d4d7de] border-[1px] border-[#f2f3f5] w-[100%] font-[700] justify-center w-full p-[6] px-[2rem]">
          {option?.icon}
          <p className=" grow-[10] text-center">{option?.title}</p>
        </button>
      ))}
    </VStack>
  );
}
