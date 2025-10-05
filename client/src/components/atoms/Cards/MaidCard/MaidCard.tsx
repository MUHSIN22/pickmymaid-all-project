"use client";

import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { slugify } from "@/utils/slugify";
import { PiHeartFill, VscVerifiedFilled } from "@/components/atoms/Icons/Icons";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import { addRedirection } from "@/lib/features/utilSlice/utileSlice";
import videoIcon from "@/assets/icons/others/video icon.png";
import { useRouter } from "next/navigation";
import "./MaidCard.scss";
import moment from "moment";
import Image from "next/image";

const logos: { [key: string]: string } = {
  Philippines: "https://flagcdn.com/w20/ph.webp",
  India: "https://flagcdn.com/w20/in.webp",
  Nepal: "https://flagcdn.com/w20/np.webp",
  Indonesia: "https://flagcdn.com/w20/id.webp",
  Bangladesh: "https://flagcdn.com/w20/bd.webp",
  Pakistan: "https://flagcdn.com/w20/pk.webp",
  Myanmar: "https://flagcdn.com/w20/mm.webp",
  Bhutan: "https://flagcdn.com/w20/bt.webp",
  Srilanka: "https://flagcdn.com/w20/lk.webp",
  Ethiopia: "https://flagcdn.com/w20/et.webp",
  Eritrea: "https://flagcdn.com/w20/er.webp",
  Kenya: "https://flagcdn.com/w20/ke.webp",
};

type IProps = {
  id?: string;
  refNumber?: number | string;
  name?: string;
  nationality?: string;
  option?: string;
  profile?: string;
  salary?: {
    from: number;
    to: number;
  };
  availability?: boolean;
  experience?: any;
  references?: boolean;
  service?: string;
  youtubeLink: string;
  postedDate: Date | string;
  isInWishlist?: boolean;
};
function MaidCard({
  id,
  refNumber,
  name,
  nationality,
  availability,
  option,
  profile,
  salary,
  experience,
  youtubeLink,
  service,
  postedDate,
  isInWishlist,
}: IProps) {
  const router = useRouter();
  const toast = useCustomToast();
  const dispatch = useAppDispatch();
  const paymentDetails = useAppSelector(
    (state) => state.payment.paymentDetails
  );

  console.log({ profile });
  const [isFavorite, setFavorite] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  const handleClick = () => {
    router.push(`/maid/${slugify(name as string)}/${refNumber || id}`);
    const data = {
      category: service,
      maid_id: id,
    };
    axiosInstance.post("analytics/category-usage", data);
  };

  const handleButtons = (event: any, type: "view" | "hire") => {
    event.preventDefault();
    event.stopPropagation();
    if (type === "view") {
      handleClick();
    } else if (type === "hire") {
      localStorage.setItem("isUnlock", "clicked");
      if (!user) {
        dispatch(setAuthModal("signup"));
        dispatch(addRedirection("/pricing"));
      } else if (paymentDetails?.subscriptionStatus === 1) {
        localStorage.setItem("scroll", "contact");
        handleClick();
      } else {
        router.push("/pricing");
      }
    }
  };
  const handleFavorite = async (event: any) => {
    event.stopPropagation();
    if (user) {
      setFavorite((prev) => !prev);
      const { data } = await axiosInstance.post("job/toggle-wishlist", {
        maidId: id,
      });
      if (data?.data?.update === 1) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    } else {
      toast("Not logged in?", "Please login for adding to favorite", "warning");
      dispatch(setAuthModal("login"));
    }
  };

  useEffect(() => {
    setFavorite(isInWishlist || false);
  }, [isInWishlist]);

  return (
    <div className="maidCard" onClick={handleClick}>
      <div className="imageContainer-aspect">
        <abbr
          style={{ position: "absolute", zIndex: 1, top: 0, right: 0 }}
          title="Add to favorite"
        >
          <div
            className={`heartIcon ${isFavorite ? "heartIcon--active" : ""}`}
            onClick={handleFavorite}
          >
            <PiHeartFill />
          </div>
        </abbr>
        <div className="imageContainer relative">
          <Image
            src={
              profile?.startsWith("http")
                ? profile
                : `${process.env.NEXT_PUBLIC_API_URL}${profile}`
            }
            alt={name!}
            fill
            className="profileImage object-cover w-full h-full aspect-square"
          />

          {youtubeLink && youtubeLink?.length > 2 && (
            <div className="absolute uppercase top-2 left-2 flex items-center text-[#7b341e] gap-2 bg-orange-100 px-1! rounded-xs text-sm font-medium">
              <img
                src={videoIcon.src}
                alt="video pickmymaid"
                className="w-auto h-4 aspect-square"
              />
              Video
            </div>
          )}
          {!availability ? (
            <div className="absolute bottom-2 right-2 opacity-50 bg-gray-100 text-gray-800 px-1! rounded-xs text-sm font-medium">
              Hired
            </div>
          ) : (
            <div className="absolute bottom-2 right-2 opacity-90 bg-green-100 text-green-800 px-1! rounded-xs text-sm font-medium">
              New
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-full grid gap-2 pt-4!">
        <div className="flex justify-between items-center">
          {postedDate && (
            <span className="text-xs max-w-[50%] font-medium">{`Posted on ${moment(
              postedDate
            ).format("DD-MM-yyyy")}`}</span>
          )}
          <div className="flex ">
            {nationality && (
              <div className="flex gap-2 items-center">
                <p className="text-xs font-medium">{nationality}</p>
                <img
                  className="w-[20px] h-[20px] aspect-square object-contain"
                  src={logos[nationality!]}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        {name && <h2 className="text-sm font-bold!">{name}</h2>}
        <div className="flex gap-2 items-center justify-between">
          <div className="text-xs px-2! py-1! rounded-md bg-red-100">
            {experience && experience > 1
              ? `${experience} Years+ experience`
              : "1 Year experience"}
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-sm  font-medium">Verified</p>
            <div className="verifiedIcon">
              <VscVerifiedFilled />
            </div>
          </div>
        </div>
        <div className="border border-b-1 border-t-1 border-l-0 border-r-0 py-2 border-text-black-600">
          <div className="flex gap-4 justify-between items-center">
            <div className="grid gap-1">
              <p className=" font-medium text-description text-xs">
                Desired monthly salary
              </p>
              <p className="text-md font-[500] text-text-black-600">
                {salary?.from === 0 && salary.to === 0
                  ? "Negotiable"
                  : `${salary?.from || "0"}-${salary?.to || "0"} AED`}
              </p>
            </div>
            <div className="grid gap-1">
              <p className=" font-medium text-description text-sm">
                Desired job
              </p>
              <p className="text-md font-[500] text-text-black-600">
                {option?.replace("And", "&") || ""}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm h-full">
          <button
            onClick={(e) => handleButtons(e, "view")}
            className="bg-primary-300 py-2 rounded-[15px]"
          >
            View Profile
          </button>
          <button
            onClick={(e) => handleButtons(e, "hire")}
            className="bg-transparent py-2 border border-primary-300 text-primary-300 rounded-[15px]"
          >
            Hire Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MaidCard);
