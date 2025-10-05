"use client";
import { useRouter } from "next/navigation";
import Image from "../NextImageWrapper/Image";
import VStack from "@/components/ui/VStack";

export default function ZigZagSection({ image, imagePos, data }: any) {
  const router = useRouter();
  return (
    <div className="grid common-padding w-[100%] grid-cols-1 md:grid-cols-2 gap-4 sm:gap-[5%] 2xl:gap-[15%]">
      {imagePos === "left" && (
        <div
          onClick={() => router.push("/hiring-tips")}
          className="relative w-full after:content-[''] after:absolute after:top-0 after:left-0 after:rounded-[20px_0_20px_0] after:bg-transparent after:border-[1px] after:border-primary-300 after:transform-[translateX(2%)_translateY(2%)] after:w-full after:h-full after:z-50"
        >
          <Image
            src={image.src as string}
            parentClass="aspect-[1.5/1] w-full h-full rounded-[0_20px_0_20px] z-[100]"
            alt={data.desc}
            noLazy
          />
        </div>
      )}
      <VStack className="items-start self-center gap-0 sm:gap-4">
        <h1 className="heading-secondary w-[100%]">{data.title}</h1>
        <p className="text-description">{data.desc}</p>
        <button
          onClick={() => router.push("/hiring-tips")}
          className="btn-solid mx-auto sm:mx-0 mt-[1rem]"
        >
          Read More
        </button>
      </VStack>
      {imagePos === "right" && (
        <div
          onClick={() => router.push("/hiring-tips")}
          className="relative w-full after:content-[''] after:absolute after:top-0 after:left-0 after:rounded-[20px_0_20px_0] after:bg-transparent after:border-[1px] after:border-primary-300 after:transform-[translateX(2%)_translateY(2%)] after:w-full after:h-full after:z-50"
        >
          <Image
            src={image.src as string}
            parentClass="aspect-[1.5/1] w-full h-full rounded-[0_20px_0_20px] z-[100]"
            alt={data.desc}
            noLazy
          />
        </div>
      )}
    </div>
  );
}
