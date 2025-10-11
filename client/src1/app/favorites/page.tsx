"use client";
import { axiosInstance } from "../../lib/axiosInstance";
import MaidCard from "../../components/atoms/Cards/MaidCard/MaidCard";
import { IFeaturedMaidCard } from "../../types/features/maid/maid.types";
import { experienceCalculator } from "../../utils/experienceCalculator";
import notFoundImg from "@/assets/images/wishlist/nothing.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const [maids, setMaids] = useState([]);

  const fetchFavoriteMaids = async () => {
    const { data } = await axiosInstance("job/wishlist");

    setMaids(() =>
      data?.data?.favorites?.map((item: any) => ({
        option: item.option,
        id: item._id,
        location: item.location,
        availability: item.availability,
        skills: item.skills,
        age: item.age,
        salary: item.salary,
        nationality: item.nationality,
        name: item.name,
        references: item.references,
        profile: "https://api.pickmymaid.com/" + item.profile,
        service: item.service,
        youtubeLink: item.youtube_link,
        postedDate: item.date,
        experience: experienceCalculator(item?.employmentHistory),
        isInWishlist: true,
      }))
    );
  };

  useEffect(() => {
    fetchFavoriteMaids();
  }, []);

  return (
    <>
      <div className="w-full h-max py-2 md:py-8 px-4 md:px-6 lg:px-8 2xl:px-32">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          {maids?.length > 0 ? (
            <>
              <h1 className="w-full text-left text-2xl md:text-3xl font-semibold">
                Your Favorite Maids/Nannies
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {maids?.map((maid: IFeaturedMaidCard, index: number) => (
                  <MaidCard key={index} {...maid} />
                ))}
              </div>
            </>
          ) : (
            <div className="min-h-[80vh] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="relative w-[25rem] h-[25rem]">
                  <Image
                    src={notFoundImg.src}
                    alt="pickmymaid favorites"
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-2xl font-semibold">Empty!</h2>
                <p className="text-gray-600">
                  Your favorites list is empty. Start adding items to see them
                  here!
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center rounded-md bg-primary-300 text-white px-6 py-3 hover:bg-primary-400 transition-colors"
                >
                  Add Items
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
