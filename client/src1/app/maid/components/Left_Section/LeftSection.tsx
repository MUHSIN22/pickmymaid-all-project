"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks";
import { addRedirection } from "../../../../lib/features/utilSlice/utileSlice";
import { axiosInstance } from "../../../../lib/axiosInstance";
import { setAuthModal } from "../../../../lib/features/auth/authSlice";
import useCustomToast from "../../../../lib/hooks/useCustomToast";
import { baseUrl } from "../../../../lib/config";
import { GetRoundedExperience } from "../../../../utils/RoundExperience";
import {
  IoCallOutline,
  PiHeartFill,
} from "../../../../components/atoms/Icons/Icons";
import { getAlternativeText } from "../../../../utils/altSelector";
import referenceIcon from "@/assets/icons/others/reference icon.png";
import Image from "next/image";
import Accordian from "../accordian/Accordian";
import ExperienceAccordian from "../experienceAccordian";

const LeftSection = ({
  data,
  setScroll,
}: {
  data: any;
  setScroll?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const toast = useCustomToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [flag, setFlag] = useState(false);
  const [profDetails, setProfDetails] = useState<any>([]);
  const [isFavorite, setFavorite] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const paymentDetails = useAppSelector(
    (state) => state.payment.paymentDetails
  );

  const handleFavorite = async (event: any) => {
    event.stopPropagation();
    if (user) {
      setFavorite((prev) => !prev);
      const { data: toggleData } = await axiosInstance.post(
        "job/toggle-wishlist",
        {
          maidId: data._id,
        }
      );
      if (toggleData?.data?.update === 1) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
      // baseToast({
      //   position: "bottom",
      //   render: () => (
      //     <HStack
      //       borderRadius="10px"
      //       bg="rgba(0,0,0,0.8)"
      //       color="#fff"
      //       p="0.5rem"
      //       gap={2}>
      //       <AspectRatio
      //         ratio={1 / 1}
      //         w="3rem">
      //         <Image
      //           src={`${baseUrl}${data?.profile}`}
      //           w="100%"
      //           h="100%"
      //           borderRadius="4px"
      //         />
      //       </AspectRatio>
      //       <Text>{toggleData?.message}</Text>
      //       <Link
      //         onClick={() => router.push("/favorites")}
      //         fontSize="1rem"
      //         fontWeight={600}>
      //         View
      //       </Link>
      //     </HStack>
      //   ),
      // });
    } else {
      toast("Not logged in?", "Please login for adding to favorite", "warning");
      router.push("/login");
    }
  };

  const handleContact = () => {
    localStorage.setItem("isUnlock", "clicked");
    if (!user) {
      dispatch(setAuthModal("signup"));
      dispatch(addRedirection("/pricing"));
    } else if (paymentDetails?.subscriptionStatus === 1) {
      localStorage.setItem("scroll", "contact");
      setScroll?.((prev) => prev + 1);
      window?.scrollTo({
        top: Number(localStorage.getItem("contactSection")) || 0,
        behavior: "smooth",
      });
    } else {
      router.push("/pricing");
    }
  };

  useEffect(() => {
    setFavorite(data?.is_in_wishlist || false);
  }, [data?.is_in_wishlist]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFlag(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  useEffect(() => {
    if (data) {
      const prodata: any = [
        { key: "Age", value: data?.age },
        {
          key: "Experience",
          value: `${GetRoundedExperience(
            data.employmentHistory.reduce(
              (sum: number, job: any) => sum + job.experiance,
              0
            )
          )} Years+`,
        },
        {
          key: "Status",
          value: !data?.availability ? "Hired" : "Not Hired",
        },
        { key: "Marital Status", value: data?.marital_status },
        { key: "Nationality", value: data?.nationality },
        { key: "Address", value: data?.current_location },
        { key: "Religion", value: data?.religion },
        { key: "Education", value: data?.education },
        { key: "Day Off", value: data?.day_of },
        {
          key: "Starting",
          value: data.is_negotiable_salary
            ? "Negotiable"
            : `AED ${data?.salary?.from}-${data?.salary?.to} per month`,
        },
        { key: "Available From", value: data?.available_from },
      ];
      setProfDetails(prodata);
    }
  }, [data]);

  const getEmbedUrl = (url: string): any => {
    if (url) {
      let embedUrl = "";
      const videoId = url.split("v=")[1];
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else {
        const arr = url.split("/");
        const videoId = arr[arr.length - 1];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      return embedUrl;
    }
    return null;
  };
  return (
    <div>
      <div className="grid lg:gap-[20px] gap-[0px]">
        <div className="rounded-[15px] gap-[10px] p-[30px_0] bg-white">
          {!flag ? (
            <div className="flex items-center relative justify-center w-[80%] max-w-[250px] aspect-[1/1] mx-auto rounded-[0_25px_0_25px] overflow-hidden">
              <div className="cards-skeleton h-[250px]! w-[250px]!"></div>
            </div>
          ) : (
            <div className="flex items-center relative justify-center w-[80%] max-w-[250px] aspect-[1/1] mx-auto rounded-[0_25px_0_25px] overflow-hidden">
              <Image
                objectFit="cover"
                objectPosition="top"
                key={`${baseUrl}${data?.profile}`}
                className="w-full h-full"
                width={250}
                height={250}
                src={`${baseUrl}${data?.profile}`}
                alt={getAlternativeText()}
              />
              <abbr
                style={{ position: "absolute", zIndex: 999, top: 0, right: 0 }}
                title="Add to favorite"
              >
                <div
                  className={`heartIcon top-1! right-1! ${
                    isFavorite ? "heartIcon--active " : ""
                  }`}
                  onClick={handleFavorite}
                >
                  <PiHeartFill />
                </div>
              </abbr>
            </div>
          )}
          <div>
            <div className="px-[1rem] justify-center w-full">
              <p className="text-center py-2 font-semibold text-black-600">
                Posted Date:{" "}
                {new Date(data?.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center justify-center gap-[20px]">
              <h2 className="text-center font-bold text-xl leading-[1.2]">
                {data?.name}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-[20px] mt-[10px]">
              <button
                className="flex text-white font-semibold rounded-md items-center gap-[10px] px-[1rem] py-[0.5rem] bg-[#25D366] border-[#25D366] hover:bg-[#25D366] hover:border-[#25D366]"
                onClick={handleContact}
              >
                <IoCallOutline style={{ fontSize: "0.5rem" }} width="20" />
                Contact Me
                {/* {data?.references && <Image w='25px' src={Verified} />} */}
              </button>
              {/* {data?.references && <Image w='25px' src={Verified} />} */}
            </div>
            <div className="gap-[3px] p-5 pb-[0px] mt-[10px]">
              {profDetails?.map(
                (item: { value: string; key: string }, i: number) => (
                  <div
                    className="grid md:grid-cols-2 grid-cols-1 py-1.5 gap-[10px] "
                    key={i}
                    style={{
                      borderBottom:
                        i !== profDetails.length - 1
                          ? "1.5px solid #a5a5a5"
                          : "",
                    }}
                  >
                    <h2
                      style={{ textTransform: "capitalize" }}
                      className="text-[16px] font-semibold md:text-[18px]"
                    >
                      {item.key}
                    </h2>
                    <p className="text-[16px] md:text-[18px]">{item.value}</p>
                  </div>
                )
              )}
              {data?.references && (
                <div className="bg-[#bee3f8] p-[0.5rem] mt-3 rounded-[8px] flex items-center gap-[0.5rem]">
                  <Image
                    src={referenceIcon.src}
                    alt="reference"
                    width={20}
                    height={20}
                  />
                  <p className="text-[16px]" color="black">
                    Reference available from previous employer
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:hidden block">
          {flag && getEmbedUrl(data?.youtube_link) && (
            <div className="grid md:p-[30px] p-[15px] gap-[10px] rounded-[15px] bg-white">
              <h2 className="text-[16px] md:text-[20px]">Proposal Video</h2>
              <div className="aspect-[4/3] w-full">
                <iframe
                  className="w-full h-full"
                  title="naruto"
                  src={`${getEmbedUrl(
                    data?.youtube_link
                  )}?var=${Math.random()}`}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
        <div className="hidden lg:block">
          <div className="grid p-[30px] md:p-[15px] rounded-[15px] bg-white">
            <h2 className="text-[1.2rem] mb-[1rem] font-semibold text-primary-400">
              Employment History
            </h2>
            {data?.employmentHistory?.map(
              (item: IEmploymentHistory, index: number) => {
                return (
                  <Accordian
                    key={index + item?.title}
                    title={item.title}
                    description={
                      <ExperienceAccordian
                        location={item.location}
                        experiance={item.experiance}
                        reason_leaving={item.reason_leaving}
                        job_description={item.job_description}
                      />
                    }
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;

export interface IEmploymentHistory {
  job_description: string;
  title: string;
  experiance: number;
  reason_leaving: string;
  location: string;
  _id: string;
}
