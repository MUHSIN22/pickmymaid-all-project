import bannerBackground from "@/assets/images/About/banner-background.webp";
import bannerImg from "@/assets/images/About/AboutUsImg.webp";
import Image from "next/image";
import { getAlternativeText } from "@/utils/altSelector";

const BannerSection = () => {

  return (
    <div
      className="common-padding grid grid-cols-1 md:grid-cols-[auto_1fr] gap-[30px] bg-cover bg-center h-[400px]"
      style={{ backgroundImage: `url('${bannerBackground.src}')` }}
    >
      <div className="hidden md:block self-end">
        <Image
          loading="lazy"
          className="h-[350px] w-auto self-end"
          src={bannerImg}
          alt={getAlternativeText()}
          sizes="(min-width: 768px) 350px, 0px"
        />
      </div>
      <div className="flex flex-col gap-5 items-center md:items-start justify-center">
        <h1 className="heading-primary-small text-primary-300">
          About Us
        </h1>
        <p className="max-w-[60vw] text-center md:text-left text-[#3F1010] ">
          Find the perfect maids and nannies you want to hire. We will make it easier. Our commitment is to provide reliable, efficient, and personalized service, ensuring the safety and satisfaction of both families and household helpers.
        </p>
      </div>
    </div>
  );
};

export default BannerSection;
