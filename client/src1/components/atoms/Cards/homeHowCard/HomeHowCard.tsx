import VStack from "../../../ui/VStack";
import Image from "../../NextImageWrapper/Image";
import HStack from "../../../ui/HStack";

export default function HomeHowCard({
  image,
  number,
  heading,
  content,
}: {
  image?: any;
  number: number;
  heading: string;
  content: string;
}) {
  console.log({ image, number, heading, content });
  return (
    <VStack className="relative flex-[10] w-[100%] sm:w-[10rem] xl:w-[25rem]">
      <HStack className="items-start w-[100%]">
        <p className="hidden sm:block text-primary-300 font-[500] text-[2rem] sm:text-[6rem] lg:text-[9rem] sm:leading-[100px] top-0 relative">
          {number}
        </p>
        {image && (
          <div className="w-[12rem] lg:w-[15rem] h-auto flex-shrink-[10] object-contain">
            <Image
              src={image}
              parentClass="w-[100%] h-auto aspect-[1.5/1]"
              alt="Quality Maids in Pickmymaid"
            />
          </div>
        )}
      </HStack>
      <VStack className="pl-[0] lg:pl-[20%] flex-[10] items-center justify-end w-[100%]">
        <HStack className="items-end justify-start w-[100%] ">
          <p className="block sm:hidden text-primary-300 font-[500] text-[3rem] sm:text-[6rem] lg:text-[9rem] leading-[40px] sm:leading-[100px] top-0 relative">
            {number}
          </p>
          <h3 className="text-black-900 font-[600] text-[1rem] md:text-[1.4rem] text-left w-[100%]">
            {heading}
          </h3>
        </HStack>
        <p className="text-black-900 text-[0.8rem] md:text-[1rem]">{content}</p>
      </VStack>
    </VStack>
  );
}
