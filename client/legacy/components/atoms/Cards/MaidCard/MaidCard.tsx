import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { slugify } from "@/utils/slugify";
import { PiHeartFill, VscVerifiedFilled } from "@/components/atoms/Icons/Icons";
import { setAuthModal } from "@/lib/features/auth/authSlice";
import { addRedirection } from "@/lib/features/utilSlice/utileSlice";
import Image from "../../../../../src/components/atoms/NextImageWrapper/Image";
import videoIcon from "@/assets/icons/others/video icon.png";
import { useRouter } from "next/navigation";
import "./MaidCard.scss";
import moment from "moment";

const logos = {
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
  experience;
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
  const baseToast = useToast();
  const paymentDetails = useAppSelector(
    (state) => state.payment.paymentDetails
  );

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

  const handleButtons = (event, type: "view" | "hire") => {
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
  console.log("nationality", logos[nationality!]);

  const handleFavorite = async (event) => {
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

      baseToast({
        position: "bottom",
        render: () => (
          <HStack
            borderRadius="10px"
            bg="rgba(0,0,0,0.8)"
            color="#fff"
            p="0.5rem"
            gap={2}
          >
            {/* < w="3rem"> */}
            <Image
              aspectRatio={1 / 1}
              src={profile as string}
              w="3rem"
              alt={name as string}
              style={{ borderRadius: "4px" }}
            />
            {/* </AspectRatio> */}
            <Text>{data?.message}</Text>
            <Link
              onClick={() => router.push("/favorites")}
              fontSize="1rem"
              fontWeight={600}
            >
              View
            </Link>
          </HStack>
        ),
      });
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
        <div className="imageContainer">
          <Image
            aspectRatio={1 / 1}
            src={profile!}
            alt={name!}
            w="100%"
            h="100%"
            className="profileImage"
            style={{ objectFit: "cover", objectPosition: "center" }}
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
      <div className="w-full grid gap-2 pt-4!">
        <div className="flex justify-between items-center">
          {postedDate && (
            <p className="text-sm font-medium">{`Posted on ${moment(
              postedDate
            ).format("DD-MM-yyyy")}`}</p>
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
        {name && <h2 className="text-xs font-bold!">{name}</h2>}
        <div className="flex justify-between gap-2 items-center">
          <div className="text-sm px-2! py-1! rounded-md bg-red-100">
            {experience > 1
              ? `${experience} Years+ experience`
              : "1 Year experience"}
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-sm font-medium">verified</p>
            <div className="verifiedIcon">
              <VscVerifiedFilled />
            </div>
          </div>
        </div>
        <div className="border border-b-1! border-t-1! py-2! border-text-black-600!">
          <div className="flex gap-4 items-center">
            <div className="grid gap-1">
              <p className=" font-medium text-description text-sm!">
                Desired monthly salary
              </p>
              <p className="text-md font-semibold text-text-black-600">
                {salary?.from === 0 && salary.to === 0
                  ? "Negotiable"
                  : `${salary?.from || "0"}-${salary?.to || "0"} AED`}
              </p>
            </div>
            <div className="grid gap-1">
              <p className=" font-medium text-description text-sm!">
                Desired job
              </p>
              <p className="text-md font-semibold text-text-black-600">
                {option?.replace("And", "&") || ""}
              </p>
            </div>
          </div>
        </div>
        <div className="flex  justify-between gap-8 sm:gap-0 w-full flex-1 items-end px-4 sm:px-0 pl-2 sm:pl-0">
          <button
            className="bg-brand-primary-300! border-2 whitespace-nowrap border-brand-primary-300! text-black py-2! w-full sm:w-max rounded-xl mr-auto px-4! font-medium hover:bg-brand-primary-400 hover:border-brand-primary-400 transition-colors"
            onClick={(e) => handleButtons(e, "view")}
          >
            View Profile
          </button>

          <button
            className="bg-transparent text-brand-primary-300! border! border-brand-primary-300! py-2! w-full sm:w-max px-4! rounded-xl font-medium min-w-32! hover:bg-brand-primary-300 hover:text-white transition-colors"
            onClick={(e) => handleButtons(e, "hire")}
          >
            Hire Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MaidCard);
