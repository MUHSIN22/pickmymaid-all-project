import { commonPadding } from "@/components/atoms/styles";
import { howItWorksData } from "./howItWorks.data";
import HomeHowCard from "@/components/atoms/Cards/homeHowCard/HomeHowCard";
import VStack from "@/components/ui/VStack";

export default function HowItWorksHome() {
  return (
    <VStack className="common-padding gap-14 w-[100%]">
      <h2 className="heading-section-title">How it works</h2>
      <div className="flex flex-col sm:flex-row flex-nowrap sm:flex-wrap items-center md:items-start gap-2 sm:gap-8 2xl:gap-16 w-[100%]">
        {howItWorksData.map((item, index) => (
          <HomeHowCard
            key={item.id}
            content={item.description}
            heading={item?.title}
            number={index + 1}
          />
        ))}
      </div>
    </VStack>
  );
}
