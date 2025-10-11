import BannerV2 from "@/components/molecules/Home/HomeSections/BannerV2/BannerV2";
import HowItWorksHome from "@/components/molecules/Home/HomeSections/HowItWorksHome/HowItWorksHome";
import NewsSection from "@/components/molecules/Home/HomeSections/NewsSection/NewsSection";
import TrustAndSafety from "@/components/molecules/Home/HomeSections/TrustAndSafety/TrustAndSafety";
import WhyUAETrust from "@/components/molecules/Home/HomeSections/WhyUAETrust/WhyUAETrust";
import interview from "@/assets/images/interview-maids.png";
import ZigZagWrapper from "@/components/molecules/Home/HomeSections/Wrappers/ZigZagWrapper";
import { axiosInstance } from "@/lib/axiosInstance";
import FeaturedMaidsWrapper from "@/components/molecules/Home/HomeSections/Featured Maids/FeaturedMaidsWrapper";
import FAQWrapper from "@/components/molecules/Home/HomeSections/FAQs/FAQWrapper";
import { cache } from "react";
import axios from "axios";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const getCounts = cache(async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}job/counts`);
  return res.data.message;
});

const getFeaturedMaids = cache(async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}job/featured?from=${null}`
  );
  return res.data.data;
});

export default async function Home() {
  const counts = await getCounts();
  const featuredMaids = await getFeaturedMaids();
  // const counts: ICounts[] = countsResponse?.data?.message;
  // const featuredMaids: IFeaturedMaidCard[] = featuredMaidResponse?.data?.data;
  console.log(featuredMaids);
  return (
    <div className="flex flex-col items-center gap-[50px] sm:gap-[80px] md:gap-[100px]">
      <div className="w-[100%]">
        <BannerV2 />
        <NewsSection />
      </div>
      <HowItWorksHome />
      <FeaturedMaidsWrapper counts={counts[0]} featuredMaids={featuredMaids} />
      <TrustAndSafety />
      <WhyUAETrust />
      <ZigZagWrapper
        imagePos="left"
        image={interview}
        data={{
          title: "The Ultimate Guide to Find a Maid or Nanny!",
          desc: "Explore our easy resources, including interview questions and tips, to help you find the perfect maid or nanny for your family. We've created a simple, step-by-step guide that covers everything from identifying your specific needs to checking references and qualifications. You'll find helpful advice on how to assess their experience, personality, and reliability. With our expert tips, you can confidently ask the right questions during interviews, ensuring you hire someone trustworthy and capable. Whether you need help with cleaning, childcare, or both, we'll help you make an informed decision and find the best fit for your home and family.",
        }}
      />
      <FAQWrapper />
    </div>
  );
}

export interface ICounts {
  nationalityCounts: NationalityCount[];
  serviceCounts: NationalityCount[];
  totalCounts: number;
}
interface NationalityCount {
  count: number;
  id: null | string;
}

export interface IFeaturedMaidCard {
  id: string;
  refNumber: string;
  name: string;
  experience: number;
  profile: string;
  salary: Salary;
  nationality: string;
  option: string;
  reference: boolean;
  hired: boolean;
  youtubeLink: string;
  service: string;
  postedDate: string;
  isInWishlist: boolean;
}

interface Salary {
  from: number;
  to: number;
}
