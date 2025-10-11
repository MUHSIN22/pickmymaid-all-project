"use client";

// import LeftSection from "@/app/maid/components/Left_Section/LeftSection";
import bannerBackground from "@/assets/images/About/banner-background.webp";
// import RightSection from "../components/Right_Section/RightSection";
import Image from "next/image";
import verifiedImage from "@/assets/images/verified_image.png";
import { axiosInstance } from "../../../lib/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../../loading";
const RightSection = dynamic(
  () => import("../components/Right_Section/RightSection"),
  { ssr: false }
);
const LeftSection = dynamic(
  () => import("../components/Left_Section/LeftSection"),
  { ssr: false }
);

const getMaidDataById = async (maidsId: string) => {
  const response = await axiosInstance.post(`/job/id/`, { id: maidsId });
  return response.data;
};

const MaidPage = ({ params }: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // const { maidsId } = await params
  // const response = await getMaidDataById(maidsId[1] ? maidsId[1] : maidsId[0])
  // const data = response?.data
  // if (!data) {
  //     notFound()
  // }
  const { maidsId }: { maidsId: string } = useParams();
  const getData = async (maidsId: string) => {
    setLoading(true);
    const response = await getMaidDataById(maidsId);
    setData(response?.data);
    setLoading(false);
  };
  useEffect(() => {
    getData(maidsId[1] ? maidsId[1] : maidsId[0]);
  }, [maidsId]);

  return (
    <>
      <div className="pb-[30px] bg-soft-gray">
        {loading && <Loading />}
        <div className="hidden lg:block">
          <div
            style={{ backgroundImage: `url(${bannerBackground.src})` }}
            className={`flex bg-cover align-center items-center bg-center px-[2rem] h-[150px] md:h-[120px]`}
          >
            <div className="max-w-[1240px] mx-auto w-full pl-3">
              <h1 className="text-primary-400 font-semibold text-4xl">
                Profile - {data?.jobApplication && data?.jobApplication?.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[2fr_4fr] max-w-[1240px] mx-auto grid-cols-1 gap-[30px] bg-soft-gray px-[1rem]">
          <LeftSection data={data?.jobApplication} />
          <RightSection data={data?.jobApplication} />
        </div>

        <div className="flex justify-center items-center py-[1rem] sm:py-[2rem] px-[1rem]">
          <div
            className="text-description flex items-center gap-[5px]"
            style={{
              backgroundColor: "rgba(51,211,153, 0.2)",
              padding: "1rem",
              border: "1px solid #34D399",
              borderRadius: "10px",
            }}
          >
            <div className="w-[2rem] h-[2rem] aspect-square">
              <Image
                src={verifiedImage.src}
                width={25}
                height={25}
                alt="verified"
              />
            </div>
            This profile has been created and verified by Pickmymaid Team
          </div>
        </div>
      </div>
    </>
  );
};

export default MaidPage;
