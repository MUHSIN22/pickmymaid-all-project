import Image from "next/image";
import aboutImg from "@/assets/images/About/reliable help.webp";
import { getAlternativeText } from "../../../../utils/altSelector";

const OurMission = () => {
  return (
    <div className="flex flex-col gap-[80px] py-[50px]">
      <div className="flex flex-col md:flex-row items-start gap-[50px]">
        <h2 className=" whitespace-nowrap text-left text-primary-300 text font-[800] text-[1.6rem] sm:text-[2.5rem] xl:text-[2.9rem] leading-[33px] sm:leading-[54px]">
          Our Mission and Values
        </h2>
        <p className="text-description">
          Our mission is to present a reliable and efficient platform for UAE
          families to find trusted and skilled maids and nannies. Our values
          center around integrity, professionalism, and transparency. We
          prioritize the safety and well-being of families through rigorous
          screening and background checks. We foster strong relationships built
          on trust and respect between families and helpers. We aim to make a
          positive impact on households by facilitating long-lasting matches
          that contribute to harmonious and nurturing environments for both
          families and household helpers.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-[1rem] sm:gap-[5%] md:gap-[15%]">
        {/* Mobile image (visible on base, hidden on sm+) */}
        <div className="relative block sm:hidden w-full aspect-[3/2]">
          <Image
            src={aboutImg}
            alt={getAlternativeText()}
            fill
            className="object-cover rounded-[0_20px_0_20px]"
            sizes="100vw"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 rounded-[20px_0_20px_0] border border-primary-300 translate-x-[2%] translate-y-[2%]" />
        </div>

        {/* Text block */}
        <div className="flex flex-col gap-0 sm:gap-4 self-center">
          <h3 className="heading-secondary font-bold text-center">
            Our Mission and Values
          </h3>
          <p className="text-description">
            Our mission is to present a reliable and efficient platform for UAE
            families to find trusted and skilled maids and nannies. Our values
            center around integrity, professionalism, and transparency. We
            prioritize the safety and well-being of families through rigorous
            screening and background checks. We foster strong relationships
            built on trust and respect between families and helpers. We aim to
            make a positive impact on households by facilitating long-lasting
            matches that contribute to harmonious and nurturing environments for
            both families and household helpers.
          </p>
        </div>

        {/* Desktop+ image (hidden on base, visible on sm+) */}
        <div className="relative hidden sm:block w-full aspect-[3/2]">
          <Image
            src={aboutImg}
            alt={getAlternativeText()}
            fill
            className="object-cover rounded-[0_20px_0_20px] object-left"
            sizes="(min-width: 576px) 50vw, 100vw"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 rounded-[20px_0_20px_0] border border-primary-300 translate-x-[2%] translate-y-[2%]" />
        </div>
      </div>
    </div>
  );
};

export default OurMission;
