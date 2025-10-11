import "./FeaturedMaids.css";
import CountryButtonWrapper from "../../../../atoms/CountryButtonWrapper/CountryButtonWrapper";
import VStack from "../../../../ui/VStack";
import HStack from "../../../../ui/HStack";
import { IFeaturedMaidCard } from "../../../../../types/features/maid/maid.types";
import { ICounts } from "../../../../../app/page";
import FeaturedCards from "./components/featuredCards";
import FeaturedCardButton from "./components/featuredCardButton";

export default function FeaturedMaids({
  counts,
  featuredMaids,
}: {
  counts: ICounts;
  featuredMaids: IFeaturedMaidCard[];
}) {
  console.log({ featuredMaids });
  return (
    <VStack className="items-center w-[100%] gap-2 sm:gap-10 bg-white common-padding">
      <VStack className="items-center">
        <h2 className="heading-section-title">
          Available Maids / Nannies in UAE
        </h2>
        <HStack className="items-center">
          {counts?.totalCounts
            ?.toString()
            ?.split("")
            ?.map((number, index) => (
              <div
                className="flex items-center justify-center w-[2rem] aspect-square bg-primary-300 rounded-[4px]"
                key={index}
              >
                <h3
                  className="heading-tertiary text-white font-[500]"
                  style={{ color: "white" }}
                >
                  {number}
                </h3>
              </div>
            ))}
        </HStack>
      </VStack>
      <div className="w-[100%] bg-soft-gray py-2 px-2 sm:py-8 sm:px-6 md:px-10 rounded-[10px]">
        <CountryButtonWrapper count={counts} />
        <div className="flex py-[1rem] flex-col items-center p-[0.5rem]">
          <p className="text-sub-title text-primary-300 font-[600]">
            New Profiles
          </p>
          <p className="mx-auto text-description font-[500] text-center">
            Updated on{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <FeaturedCards featuredMaids={featuredMaids} />
        <HStack className="items-center justify-center mt-8">
          <FeaturedCardButton />
        </HStack>
      </div>
    </VStack>
  );
}
