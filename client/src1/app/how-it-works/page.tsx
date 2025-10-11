import Image from "../../components/atoms/NextImageWrapper/Image";
import React from "react";
import lady from "@/assets/images/how/lady.webp";
import h1 from "@/assets/images/how/h1.webp";
import h2 from "@/assets/images/how/h2.webp";
import h3 from "@/assets/images/how/h3.webp";
import one from "@/assets/images/how/1.webp";
import two from "@/assets/images/how/2.webp";
import three from "@/assets/images/how/3.webp";
import HowCard from "../../components/atoms/howCard/HowCard";
import bannerBackground from "@/assets/images/About/banner-background.png";

export default function page() {
  return (
    <div className="min-h-[65vh]">
      <div
        className="grid relative bg-cover bg-center h-[180px] md:h-[350px] gap-6 justify-items-center place-content-center"
        style={{
          backgroundImage: `url('${bannerBackground.src}')`,
        }}
      >
        <h1 className="heading-primary !text-primary-400">How it works?</h1>
        <div className="hidden md:block absolute bottom-0 md:right-[10%] xl:[15vw] 2xl:[18vw]">
          <Image
            src={lady.src}
            parentClass="w-[20vw] h-auto aspect-[384/328]"
            alt="How pickmymaid works?"
          />
        </div>
      </div>
      <div className="w-full justify-center items-center flex">
        <div className="flex flex-col md:flex-row p-[0_5%] sm:p-[0_25%] md:p-[0_2%] lg:p-[0_3%] xl:p-0 max-w-[1000px] gap-[0.5rem] md:gap-[1rem] mt-[-2rem] lg:mt-[-5rem] common-padding">
          <HowCard
            head="Search"
            para="Browse through 900+ profiles of nannies and maids in the UAE, complete with detailed information, right here."
            image={h1}
            number={one}
          />
          <HowCard
            head="Register to access details of available maids"
            para="Get started with the interview process by selecting a package that grants you access to detailed information about the available maids."
            image={h2}
            number={two}
          />
          <HowCard
            head="Hire"
            para="Communicate your requirements directly with the maid or nanny, come to a mutual agreement, and proceed to hire her for the position."
            image={h3}
            number={three}
          />
        </div>
      </div>
    </div>
    // <Box minH="65vh">
    //     <Grid
    //       pos="relative"
    //       bgSize="cover"
    //       bgPosition="center"
    //       bg={`url('${bannerBackground.src}')`}
    //       h={{ base: "180px", lg: "350px", "2xl": "350px" }}
    //       gap={6}
    //       justifyItems="center"
    //       placeContent="center"
    //     >
    //       <Heading as="h1" color="brand.primary.300">
    //         {t("home.working.heading")}
    //       </Heading>
    //       <Show above="md">
    //         <Box
    //           pos="absolute"
    //           bottom={0}
    //           right={{ md: "10%", xl: "15vw", "2xl": "18vw" }}
    //         >
    //           <Image
    //             src={lady.src}
    //             w="20vw"
    //             h="auto"
    //             alt="How pickmymaid works?"
    //             aspectRatio={384 / 328}
    //           />
    //         </Box>
    //       </Show>
    //     </Grid>

    //     <Center>
    //       <Flex
    //         direction={{
    //           base: "column",
    //           sm: "column",
    //           md: "row",
    //           lg: "row",
    //           xl: "row",
    //         }}
    //         p={{ base: "0 5%", sm: "0 25%", md: "0 2%", lg: "0 3%", xl: "0" }}
    //         sx={{ commonPadding }}
    //         mt={{ base: "-2rem", sm: "-2rem", lg: "-5rem" }}
    //         maxW="1000px"
    //         gap={{ base: "0.5rem", md: "1rem" }}
    //       >
    //         <HowCard
    //           head={t("home.working.search.title")}
    //           para={t("home.working.search.description")}
    //           image={h1}
    //           number={one}
    //         />
    //         <HowCard
    //           head={t("home.working.register.title")}
    //           para={t("home.working.register.description")}
    //           image={h2}
    //           number={two}
    //         />
    //         <HowCard
    //           head={t("home.working.hire.title")}
    //           para={t("home.working.hire.description")}
    //           image={h3}
    //           number={three}
    //         />
    //       </Flex>
    //     </Center>
    //   </Box>
  );
}
