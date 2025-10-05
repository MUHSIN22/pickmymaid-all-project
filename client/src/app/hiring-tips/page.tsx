import Image from "@/components/atoms/NextImageWrapper/Image";
import VStack from "@/components/ui/VStack";
import React from "react";
import bulb from "@/assets/images/Tips/bulb.webp";
import HStack from "@/components/ui/HStack";
import interviewTips from "@/assets/images/Tips/interview-tips.webp";
import { questions, tips } from "./Tips.data";
import InterviewQuestions from "@/components/atoms/InterviewQuestions/InterviewQuestions";
import InterviewQuestionsWrapper from "@/components/atoms/InterviewQuestions/InterviewQuestionsWrapper";
import InterviewProcessWrapper from "@/components/atoms/InterviewProcess/InterviewProcessWrapper";

export default function page() {
  return (
    <VStack className="gap-[50px] sm:gap-[80px] md:gap-[100px] items-center">
      <VStack className="text-center gap-[2rem] pt-[1rem]">
        <HStack className="items-center justify-center w-[100%]">
          <h1 className="heading-section-title header-line-left">
            Key Tips for Hiring
          </h1>
          <Image
            src={bulb.src}
            className="w-[2.5rem] sm:w-[3rem] aspect-[1/1]"
            alt="Key tips for hiring maids/nannies"
          />
        </HStack>
        <p className="text-description text-[0.9rem] sm:text-[1.1rem] max-w-[50rem] px-[1rem]">
          To make your search for the right maid or nanny through Pickmymaid as
          efficient as possible, follow these straightforward steps. This
          approach helps you quickly identify that meet your specific needs and
          preferences. <br /> <br /> Below are soe essential interview tips to
          guide you in selecting the perfect maid or nanny.
        </p>
      </VStack>

      <VStack className="text-center common-padding gap-5 md:gap-10 w-full items-center">
        {tips.map((tips) => (
          <InterviewProcessWrapper {...tips} key={tips.index} />
        ))}
      </VStack>

      <VStack className="text-center common-padding gap-5 md:gap-10">
        <h1 className="heading-secondary text-center header-line-left sm:hidden">
          Finding the Perfect Fit: A Guide to Interviewing Your Nanny or Maid!
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1rem] sm:gap-[3rem]">
          <Image
            className="aspect-[1.5/1] w-[100%] h-[100%] rounded-[0px_20px_0px_20px] sm:block hidden"
            src={interviewTips.src}
            alt="Maids hiring tips"
          />
          <VStack className="sm:gap-4 self-center">
            <h1 className="heading-secondary text-left header-line-left">
              Finding the Perfect Fit: A Guide to Interviewing Your Nanny or
              Maid!
            </h1>
            <p className="text-description">
              {" "}
              Finding the right nanny or maid for your family is an important
              decision that requires careful consideration and understanding.
              This guide will assist you in conducting a thorough interview to
              uncover essential insights about potential candidates. By
              exploring various aspects such as basic information, work history,
              attitude and personality, decision-making skills, and key points,
              you can ensure that you select someone who not only meets your
              family's practical needs but also aligns with your values and
              expectations. Ultimately, this process will help you identify the
              right match for your family, fostering a harmonious environment
              for both caregivers and children
            </p>
          </VStack>
          <Image
            className="aspect-[1.5/1] w-[100%] h-[100%] rounded-[0px_20px_0px_20px] block sm:hidden"
            src={interviewTips.src}
            alt="Maids hiring tips"
          />
        </div>
      </VStack>

      <VStack className="common-padding w-[100%] items-center max-w-[85rem] gap-5 md:gap-10">
        {questions.map((qstn, index) => (
          <InterviewQuestionsWrapper {...qstn} key={index} />
        ))}
        <p className="text-description w-[100%] text-left">
          {" "}
          This guide offers essential interview questions; explore the FAQ
          section for additional tips to ensure you find the perfect Maid or
          Nanny
        </p>
        <p className="text-description w-[100%] text-left">
          &copy; {new Date().getFullYear()} Pickmymaid - All Right Reserved.
          <br />
          <br />
          All contents including text, images, logos, profile and data on this
          website is the property of Pickmymaid and protected by copyright laws.
          Unauthorized use, reporduction or distribution is strictly prohbited.{" "}
          <br />
          Scraping, Data mining or copying content without permission may result
          in legal action. For permissions or copyright concerns, contact
          support@pickmymaid.com
        </p>
      </VStack>
    </VStack>
  );
}
