import bannerImg from "@/assets/images/Home/banner-v2.png";
import Image from "@/components/atoms/NextImageWrapper/Image";
import VStack from "@/components/ui/VStack";
import Link from "next/link";

const list: string[] = [
  "Muslim",
  "Part Time",
  "UAE",
  "Dubai",
  "Filipino",
  "Indonesian",
  "Srilankan",
  "Nepali",
  "Malayalam",
  "Arabic",
  "Maid cum Nanny",
  "Maid",
  "Nanny",
  "Cleaning",
  "Cooking",
  "Live-in",
  "Live-out",
  "English",
  "Caregiver",
  "Driver",
  "Private Tutor",
  "Private Nurse",
  "Postpartum care",
  "Cook",
];

export default function BannerV2() {
  return (
    <div className="h-max w-[100%] common-padding py-2 md:py-8 pb-6 bg-soft-gray sm:bg-white bg-[url('/assets/images/Home/banner-v2.png')] bg-no-repeat bg-contain bg-[left_bottom]">
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-[10%] h=[23rem] sm:h-auto">
        <VStack className="items-start justify-between sm:justify-center h-[100%] static z-[20] flex-shrink-[2] gap-[0.5rem] sm:gap-[1rem]">
          <VStack className="gap-[0.5rem] items-center sm:items-start text-center sm:text-left">
            <h1 className="min-h-[2rem] heading-primary !text-black-700 w-[100%] !font-[800] max-w-[45rem] leading-[30px] sm:leading-[55px]">
              Are you looking for a Maid or Nanny in UAE?
            </h1>
            <p className="text-[1rem] text-black-900 max-h-max">
              Register now, and save additional charges that you spend on
              agencies. <br />
              <br />
            </p>
            <Link href="/search" className="btn-solid">
              Search All Maids / Nannies
            </Link>
          </VStack>
        </VStack>
        <span className="hidden md:block">
          <Image
            src={bannerImg.src}
            parentClass="aspect-[741/753] w-full"
            alt="Quality Maids in Pickmymaid"
            noLazy
            priority
          />
        </span>
      </div>
    </div>
  );
}
