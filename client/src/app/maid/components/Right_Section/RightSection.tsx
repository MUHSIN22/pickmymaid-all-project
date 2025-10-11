"use client";
import ForPremium from "@/components/atoms/ForPremiumOnly/ForPremium";
import {
  MdLocationOn,
  MdOutlineMail,
  MdOutlineVideoCall,
  MdPhone,
  RiWhatsappFill,
} from "@/components/atoms/Icons/Icons";
import PremiumButton from "@/components/atoms/PremiumButton/PremiumButton";
import { axiosInstanceV2 } from "@/lib/axiosInstance";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import { fetchMaidDataById } from "@/lib/features/maid/maidAction";
import { addRedirection } from "@/lib/features/utilSlice/utileSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SkillsLanguages from "../SkillsLanguages";
import Accordian from "../accordian/Accordian";
import ExperienceAccordian from "../experienceAccordian";
import { IEmploymentHistory } from "../Left_Section/LeftSection";

const RightSection = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const contactRef = useRef<HTMLDivElement>(null);

  const [flag, setFlag] = useState(false);
  const languageLevel: Record<number, string> = {
    0: "Good",
    1: "Excellent",
    2: "Fair",
    3: "Don't Know",
  };
  const paymentDetails = useAppSelector(
    (state) => state.payment.paymentDetails
  );

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

  const handleHire = () => {
    if (!user) {
      router.push("/register");
      dispatch(addRedirection("pricing"));
    } else {
      router.push("/pricing");
    }
  };

  const handleContactRedirect = (type: string, number: string) => {
    let link;
    const trimmedNum = number.replace(/\s+/g, "");
    console.log({ number, trimmedNum });
    if (type === "uae_no") {
      link = `tel:${trimmedNum}`;
    } else if (type === "whatsapp") {
      link = `https://wa.me/${trimmedNum}`;
    } else if (type === "botim") {
      link = `botim://chat?user=${trimmedNum.replace("+", "")}`;
    }

    if (link) {
      window.location.href = link;
    }
  };

  useLayoutEffect(() => {
    if (contactRef.current) {
      localStorage.setItem(
        "contactSection",
        contactRef.current?.getBoundingClientRect().top.toString()
      );
    }
  }, []);

  function alternateSort(skills: string[]): string[] {
    // Sort skills in ascending order of length
    const sortedSkills = [...skills].sort((a, b) => a.length - b.length);

    const result: string[] = [];
    let left = 0; // Pointer for shorter words
    let right = sortedSkills.length - 1; // Pointer for longer words
    let toggle = true; // Toggle between short and long

    while (left <= right) {
      if (toggle) {
        result.push(sortedSkills[left]); // Take shorter word
        left++;
      } else {
        result.push(sortedSkills[right]); // Take longer word
        right--;
      }
      toggle = !toggle; // Flip toggle for next iteration
    }

    return result;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFlag(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (
      paymentDetails?.subscriptionStatus == 1 &&
      (!data?.uae_no || data?.uae_no === "") &&
      (!data?.whatsapp_no || data?.whatsapp_no === "") &&
      (!data?.botim_number || data?.botim_number === "")
    ) {
      axiosInstanceV2.post("/auth/log-error", {
        details: paymentDetails,
        data,
      });
      dispatch(fetchMaidDataById(data?._id));
    }
  }, [paymentDetails, data]);

  return (
    <div>
      <div className="grid gap-[20px]">
        <div>
          <div className="gap-[10px] p-[15px] md:p-[30px] bg-white rounded-[15px]">
            <h2 className="text-[1.2rem] font-bold text-primary-300">
              About Me
            </h2>
            <div
              className="text-[0.9rem] mt-2 sm:text-[1rem] text-black-600"
              dangerouslySetInnerHTML={{ __html: data?.notes }}
            />
          </div>
        </div>

        <div
          className="gap-[10px] grid p-[15px] md:p-[30px] bg-white rounded-[15px]"
          ref={contactRef}
          id="contact_section"
        >
          <div className="flex items-center justify-between pb-[20px]">
            <h2 className="text-[1.2rem] font-bold text-primary-300">
              Contacts
            </h2>
            {paymentDetails?.subscriptionStatus !== 1 && <PremiumButton />}
          </div>
          {/* Current location */}
          <div className="grid border-b border-black-300 grid-cols-1 sm:grid-cols-[2fr_1fr]">
            <div className="flex items-center gap-[5px]">
              <MdLocationOn
                className="text-[#FF0000] "
                width={22}
                height={22}
              />
              <h2 className="text-[1.2rem] font-semibold">Current location</h2>
            </div>
            <p className="text-[1.2rem]">{data?.current_location}</p>
          </div>
          {/* UAE calling number */}
          <div className="grid border-b border-black-300 grid-cols-1 sm:grid-cols-[2fr_1fr]">
            <div className="flex items-center gap-[5px]">
              <MdPhone className="text-primary-400 " width={22} height={22} />
              <h2 className="text-[1.2rem] font-semibold">
                UAE calling number
              </h2>
            </div>
            <ForPremium isBlur={paymentDetails?.subscriptionStatus !== 1}>
              <p>
                {paymentDetails?.subscriptionStatus === 1 ? (
                  data?.uae_no === "+" ||
                  !data?.uae_no ||
                  data?.uae_no === "" ? (
                    "---"
                  ) : (
                    <span
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleContactRedirect("uae_no", data?.uae_no)
                      }
                    >
                      {data?.uae_no}
                    </span>
                  )
                ) : (
                  <span>+971 000000000</span>
                )}
              </p>
            </ForPremium>
          </div>
          {/* WhatsApp number */}
          <div className="grid border-b border-black-300 grid-cols-1 sm:grid-cols-[2fr_1fr]">
            <div className="flex items-center gap-[5px]">
              <RiWhatsappFill
                className="text-[#25d366] "
                width={22}
                height={22}
              />
              <h2 className="text-[1.2rem] font-semibold">WhatsApp number </h2>
            </div>
            <ForPremium isBlur={paymentDetails?.subscriptionStatus !== 1}>
              <p>
                {paymentDetails?.subscriptionStatus === 1 ? (
                  data?.whatsapp_no === "+" ||
                  !data?.whatsapp_no ||
                  data?.whatsapp_no === "" ? (
                    "---"
                  ) : (
                    <span
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleContactRedirect("whatsapp", data?.whatsapp_no)
                      }
                    >
                      {data?.whatsapp_no}
                    </span>
                  )
                ) : (
                  "+971 000000000"
                )}
              </p>
            </ForPremium>
          </div>
          {/* Botim number */}
          <div className="grid border-b border-black-300 grid-cols-1 sm:grid-cols-[2fr_1fr]">
            <div className="flex items-center gap-[5px]">
              <MdOutlineVideoCall
                className="text-[#00aff0] "
                width={22}
                height={22}
              />
              <h2 className="text-[1.2rem] font-semibold">Botim number</h2>
            </div>
            <ForPremium isBlur={paymentDetails?.subscriptionStatus !== 1}>
              <p>
                {paymentDetails?.subscriptionStatus === 1 ? (
                  data?.botim_number === "+" ||
                  !data?.botim_number ||
                  data?.botim_number === "" ? (
                    "---"
                  ) : (
                    <span
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleContactRedirect("botim", data?.botim_number)
                      }
                    >
                      {data?.botim_number}
                    </span>
                  )
                ) : (
                  "+971 000000000"
                )}
              </p>
            </ForPremium>
          </div>
          {/* mail */}
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr]">
            <div className="flex items-center gap-[5px]">
              <MdOutlineMail
                className="text-[#FF0000] "
                width={22}
                height={22}
              />
              <h2 className="text-[1.2rem] font-semibold">Email</h2>
            </div>
            <ForPremium isBlur={paymentDetails?.subscriptionStatus !== 1}>
              <p>
                {paymentDetails?.subscriptionStatus === 1
                  ? data?.email || " -- "
                  : "PleaseSubscribe@gmail.com"}
              </p>
            </ForPremium>
          </div>
        </div>

        {/* <div className="hidden sm:block">
          <div className="gap-[10px] p-[15px] md:p-[30px] bg-white rounded-[15px]">
            <h2 className="text-[1.2rem] font-bold text-primary-300">About Me</h2>
            <div
              className="text-[0.9rem] sm:text-[1rem] text-black-600 xl:text-[1.2rem]"
              dangerouslySetInnerHTML={{ __html: data?.notes }}
            />
          </div>
        </div> */}

        <div className="grid gap-[10px] p-[15px] md:p-[30px] bg-white rounded-[15px]">
          <h2 className="text-[1.2rem] font-bold text-primary-300">
            Visa Details
          </h2>
          {data?.visa_status && (
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr]">
              <h2 className="text-[1rem] font-semibold">Visa status</h2>
              <p>{data?.visa_status}</p>
            </div>
          )}
          {data?.visa_expire && (
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr]">
              <h2 className="text-[1rem] font-semibold">Visa Expiry</h2>
              <p>{data?.visa_expire?.split("-").reverse().join("-")}</p>
            </div>
          )}
        </div>

        <div className="block lg:hidden">
          <div className="gap-[15px] p-[15px] md:p-[30px] bg-white rounded-[15px]">
            <h2 className="text-[1.2rem] font-bold text-primary-300 pb-2">
              Employment History
            </h2>
            {data?.employmentHistory?.map(
              (item: IEmploymentHistory, index: number) => {
                return (
                  <Accordian
                    key={index + item?.title}
                    title={item?.title}
                    description={
                      <ExperienceAccordian
                        location={item?.location}
                        experiance={item?.experiance}
                        reason_leaving={item?.reason_leaving}
                        job_description={item?.job_description}
                      />
                    }
                  />
                );
              }
            )}
          </div>
        </div>

        {/* yoututbe video  */}
        <div className="hidden lg:block">
          {flag && getEmbedUrl(data?.youtube_link) && (
            <div className="gap-[15px] p-[15px] md:p-[30px] bg-white rounded-[15px]">
              <h2 className="text-[1.2rem] font-bold text-primary-300">
                Proposal Video
              </h2>
              <div className="w-full aspect-[4/3]">
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

        {/* skill */}
        <div className="grid gap-[10px] p-[15px] md:p-[30px] bg-white rounded-[15px]">
          <h2 className="text-[1.2rem] font-bold text-primary-300">Skills</h2>
          <div className="flex gap-[25px] flex-wrap">
            {data?.skills &&
              alternateSort(data?.skills).map((item) => (
                <SkillsLanguages key={item} text={item} />
              ))}
          </div>
        </div>

        {/* language */}
        <div className="grid gap-[10px] p-[15px] md:p-[30px] bg-white rounded-[15px]">
          <h2 className="text-[1.2rem] font-bold text-primary-300">Language</h2>
          <div className="flex gap-[15px] flex-wrap">
            {data?.language?.map((item: any) => (
              <div
                key={item?.name}
                className="grid p-[10px] border rounded-[10px] border-primary-300"
              >
                <h2 className="font-semibold text-[1rem]">{item?.name}</h2>
                <div className="flex gap-[5px] align-center">
                  <h2>Read :</h2>
                  <h2>{languageLevel[item?.read]}</h2>
                </div>
                <div className="flex gap-[5px] align-center">
                  <h2>Write :</h2>
                  <h2>{languageLevel[item?.write]}</h2>
                </div>
                <div className="flex gap-[5px] align-center">
                  <h2>Speak :</h2>
                  <h2>{languageLevel[item?.speak]}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        {paymentDetails?.subscriptionStatus !== 1 && (
          <button
            className="w-full bg-primary-300 hover:bg-primary-400 transition-all duration-300 text-[1rem] font-semibold text-white p-[15px] rounded-[10px]"
            onClick={handleHire}
          >
            Hire Now
          </button>
        )}
      </div>
    </div>
  );
};

export default RightSection;
