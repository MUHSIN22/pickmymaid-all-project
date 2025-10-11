import VStack from "../../../../ui/VStack";
import { trustData } from "./uaeTrust.data";
import Image from "../../../../atoms/NextImageWrapper/Image";

export default function WhyUAETrust() {
  return (
    <VStack className="common-padding py-[3rem] w-[100%] gap-[3rem]">
      <VStack className="text-center items-center">
        <h1 className="heading-section-title">
          Why UAE Families Trust Pickmymaid?
        </h1>
      </VStack>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[0.5rem] md:gap-[1rem]">
        {trustData.map((data: any) => (
          <VStack
            className="items-start flex-[1] flex-row gap-[1rem] rounded-[30px_0]"
            key={data.title}
          >
            <Image
              src={data.icon.src as string}
              parentClass="aspect-[1/1] w-[2rem] flex-shrink-0 md:w-[5rem]"
              alt={data.desc}
            />
            <VStack className="justify-start text-left items-center">
              <p className="text-description font-[600] text-primary-300! w-[100%]">
                {data.title}
              </p>
              <p className="text-[0.7rem] text-black-900 sm:text-[0.8rem]">
                {data.desc}
              </p>
            </VStack>
          </VStack>
        ))}
      </div>
    </VStack>
    // <VStack
    //   sx={commonPadding}
    //   pt="3rem"
    //   pb="3rem"
    //   w="100%"
    //   gap={{ base: "3rem" }}
    // >
    //   <VStack textAlign="center">
    //     <Heading as="h1" variant="sectionTitle">
    //       {t("home.whyUAETrust.heading")}
    //     </Heading>
    //   </VStack>

    //   <SimpleGrid
    //     columns={{ base: 1, md: 2, xl: 4 }}
    //     gap={{ base: ".5rem", md: "1rem" }}
    //   >
    //     {trustData.map((item) => (
    //       <VStack
    //         key={item.title}
    //         flex={1}
    //         flexDir="row"
    //         alignItems="flex-start"
    //         gap="1rem"
    //         borderRadius="30px 0"
    //       >
    //         <Image
    //           src={item.icon.src}
    //           w={{ base: "2rem", md: "5rem" }}
    //           alt={item.title}
    //         />
    //         <VStack justifyContent="flex-start" textAlign="left">
    //           <Text
    //             variant="description"
    //             fontWeight={600}
    //             color="brand.primary.300"
    //             w="100%"
    //           >
    //             {t(item.title)}
    //           </Text>
    //           <Text fontSize={{ base: "0.7rem", sm: "0.9rem" }}>
    //             {t(item.desc)}
    //           </Text>
    //         </VStack>
    //       </VStack>
    //     ))}
    //   </SimpleGrid>
    // </VStack>
  );
}
