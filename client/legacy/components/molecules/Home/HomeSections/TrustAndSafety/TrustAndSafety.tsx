import { trustData } from "./trust.data";
import Image from "@/components/atoms/NextImageWrapper/Image";
import VStack from "@/components/ui/VStack";

export default function TrustAndSafety() {
  // const imageWidth = useBreakpointValue({ base: "3rem", md: "5rem" });

  return (
    <VStack className="common-padding bg-white w-[100%] gap-[3rem]">
      <VStack className="text-center items-center">
        <h1 className="heading-section-title">Trust and Safety</h1>
        <p className="text-description text-[0.9rem] sm:text-[1.1rem] max-w-[50rem]">
          How our HR team Verifying Maids and Nannies at Pickmymaid, Our
          dedicated team works behind the scenes every day, uploading only
          genuine applicants to ensure the highest standards of Trust and Safety
        </p>
      </VStack>
      <div className="flex flex-wrap justify-center gap-[1.5rem] md:gap-[3rem]">
        {trustData.map((data: any) => (
          <VStack className="items-center" key={data.value}>
            <Image
              src={data.image.src as string}
              // aspectRatio={1 / 1}
              parentClass="aspect-[1/1] w-[3rem] md:w-[5rem]"
              // w={imageWidth}
              alt={data.value}
            />
            <p className="text-sub-title">{data.value}</p>
          </VStack>
        ))}
      </div>
    </VStack>
  );
}
