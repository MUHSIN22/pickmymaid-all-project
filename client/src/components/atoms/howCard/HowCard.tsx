import { getAlternativeText } from "@/utils/altSelector";
import Image from "../NextImageWrapper/Image";

export default function HowCard({ image, number, head, para }: any) {
  return (
    <div className="flex bg-white relative w-[100%] rounded-[35px_0px_35px_0px] border-[0.88px] border-[#FF8F5F] p-[1rem] h-[25rem] sm:h-[24rem] md:h-[28rem] lg:h-[25rem] xl:h-[25rem]">
      <div className="left-0 md:left-[0.1rem] md:left-[1rem] xl:left-[0] top-[1rem] object-contain absolute w-[5rem] md:w-[3rem] xl:w-[5rem] h-[11rem] md:h-[8rem] xl:h-[11rem]">
        <Image
          src={number}
          parentClass="w-[100%] h-[100%] aspect-[5/11]"
          alt="How pickmymaid works"
        />
      </div>
      <div className="flex flex-col gap-[1rem] mt-[5] w-full items-center">
        {image && (
          <div className="w-[13rem] lg:w-[9rem] xl:w-[13rem] h-[12rem] lg:h-[10rem] xl:h-[12rem]">
            <Image
              src={image}
              alt="How it works"
              parentClass="w-[100%] h-[auto] aspect-[4/3]"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="heading-smaller">{head}</h3>
          <p className="text-description">{para}</p>
        </div>
      </div>
    </div>
  );
}
