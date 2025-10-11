"use client";
import news from "@/assets/images/khaleej tp.png";
import newsLap from "@/assets/images/Khaleej Lap Mockup.png";
import Image from "../../components/atoms/NextImageWrapper/Image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VStack from "../../components/ui/VStack";

export default function PressAppearanceWrapper() {
  const router = useRouter();
  return (
    <VStack className="items-center common-padding press-appearance gap-5 md:gap-10">
      <h2 className="heading-section-title header-line-right">
        Pickmymaid Featured in Khaleej Times
      </h2>
      <div className="grid w-full grid-cols-1 sm:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_1fr] gap-4 sm:gap-[5%]">
        <div
          className="hidden md:block"
          onClick={() =>
            router.push(
              "https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.khaleejtimes.com%2Fkt-network%2F5900-maids-find-employment-through-pickmymaid&data=05%7C02%7Cnayeem%40khaleejtimes.com%7C2695c90fc986448d762208dcd63a28e6%7C0040243cb43f404c88fd836f145edbcb%7C0%7C0%7C638620792540551395%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C0%7C%7C%7C&sdata=DK6bMZY9qhlXgPeV8uCYBwcqaMxojff3UEKVzwqXbHY%3D&reserved=0"
            )
          }
        >
          <Image
            src={newsLap.src}
            parentClass="w-[100%] h-full rounded-[0_20px_0_20px] my-auto mx-0 cursor-pointer"
            alt="Pickmymaid Featured in Khaleej Times"
          />
        </div>
        <div
          className="block md:hidden relative w-[60%] sm:w-[100%] h-full justify-center justify-self-center cursor-pointer"
          onClick={() =>
            (window.location.href =
              "https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.khaleejtimes.com%2Fkt-network%2F5900-maids-find-employment-through-pickmymaid&data=05%7C02%7Cnayeem%40khaleejtimes.com%7C2695c90fc986448d762208dcd63a28e6%7C0040243cb43f404c88fd836f145edbcb%7C0%7C0%7C638620792540551395%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C0%7C%7C%7C&sdata=DK6bMZY9qhlXgPeV8uCYBwcqaMxojff3UEKVzwqXbHY%3D&reserved=0")
          }
        >
          <Image
            src={news.src}
            parentClass="aspect-[233/469] w-full h-full rounded-[0_20px_0_20px]"
            alt="Pickmymaid Featured in Khaleej Times"
          />
        </div>

        <VStack className="items-center sm:gap-4 self-center">
          <h1 className="heading-secondary text-left w-full">
            5,900 Maids Successfully Employed
          </h1>
          <p className="text-description">
            We are thrilled to be recognized by Khaleej Times for achieving a
            significant milestone—helping over 5,900 maids find employment in
            the UAE!
            <br />
            <br />
            At Pickmymaid, our mission is simple: to connect skilled domestic
            workers with families in need of reliable household help. Through
            our seamless online platform, we make the hiring process easier,
            faster, and more transparent for both employers and workers.
            <br />
            <br />
            "Our platform is designed to create a win-win situation—offering
            employment opportunities while simplifying the hiring process for
            UAE residents." — Mohammed Ibrahim, Manager of Pickmymaid
            <br />
            <br />
            This feature highlights our dedication to revolutionizing the
            domestic help industry in the UAE. As we continue to grow, we remain
            committed to providing trusted, efficient, and ethical solutions for
            families and domestic workers alike.
            <br />
            <br />
            Looking for a reliable maid? {/* TODO: enable link */}
            <Link href="/search" style={{ color: "blue" }}>
              Find one Today
            </Link>
          </p>
        </VStack>
      </div>
    </VStack>
  );
}
