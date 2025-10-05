// Removed Chakra UI imports - now using Tailwind CSS
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
// import SelectInput from "@/components/atoms/InputFields/SelectInput/SelectInput";
import { emiratesList, serviceList } from "./banner.data";
import bannerBg from "@/assets/images/Home/banner-bg.jpeg";

import "react-lazy-load-image-component/src/effects/blur.css";

const bannerLength = 8;

const bannerTitle: string[] = [
  "common.categories.maids",
  "common.categories.nanny",
  "common.categories.caregiver",
  "common.categories.private_nurse",
  "common.categories.private_tutor",
  "common.categories.driver",
  "common.categories.postpartum_care",
  "common.categories.cook",
];

const AnimatedBox = motion.div;

export default function Banner() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [bannerIndex, setBannerIndex] = useState<number>(0);

  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const onBannerSubmission = (data: any) => {
    const { location, service } = data;
    if (location || service) {
      router.push(
        `/search?${location ? `location=${location}&` : ""}${service ? `service=${service}` : ""
        }`
      );
    }
  };

  useLayoutEffect(() => {
    const bannerInterval = setInterval(() => {
      setBannerIndex((prev: number) =>
        prev < bannerLength - 1 ? prev + 1 : 0
      );
    }, 4000);

    return () => clearInterval(bannerInterval);
  }, []);

  return (
    <div className="h-max w-full py-2 md:py-8 px-2 md:px-6 lg:px-8 2xl:px-32">
      <div className="w-full relative h-full rounded-xl">
        <div
          className="flex items-center flex-col lg:flex-row gap-5 md:gap-20 px-4 sm:px-16 py-4 lg:py-4 rounded-xl overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url('${bannerBg}')`,
            boxShadow: 'inset 10000px 10000px 0 rgba(255, 144.33, 96.9, 0.15)'
          }}
        >
          <div
            className={`flex flex-col items-start justify-center h-full static z-20 flex-shrink-2 ${
              i18n.dir() === "ltr" ? "text-center md:text-left" : "text-center md:text-right"
            }`}
          >
            <h1 className="min-h-8 w-full text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              <Trans components={{ br: <br /> }}>
                {t("home.banner.heading")}
              </Trans>
            </h1>
            <div className="hidden sm:block">
              <p className="text-white text-base md:text-lg mb-4">
                {t("home.banner.subheading")}
                <br />
                <br />
              </p>
            </div>
            <p className="text-lg md:text-xl mt-0 mb-2">
              <strong className="text-white">
                {t("home.banner.register")}
              </strong>
            </p>
            <p
              className={`text-lg md:text-xl mt-0 w-full ${
                i18n.dir() === "ltr" ? "text-center sm:text-left" : "text-center sm:text-right"
              }`}
            >
              <strong
                className="text-[#FF8F5F] px-1 rounded bg-white"
              >
                {t("home.banner.plan")}
              </strong>
            </p>
          </div>

          {/* Search Form */}
          <div className="hidden sm:flex">
            <div
              className="w-full md:w-[30rem] xl:w-[40rem] flex flex-col gap-1 sm:gap-4 py-3 sm:py-6 px-4 sm:px-8 bg-white rounded-xl items-start static z-20 h-max my-0 md:my-4 lg:my-8"
            >
              <div className="flex flex-col items-start gap-0 sm:gap-1 w-full">
                <h2 className="text-xl md:text-2xl font-semibold flex overflow-hidden text-gray-800">
                  {t("home.banner.form.find")}{" "}
                  <AnimatedBox
                    initial={{
                      y: "-100%",
                    }}
                    animate={{
                      y: ["100%", "0%", "0%", "0%", "-100%"],
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="text-orange-500 ml-2"
                  >
                    {t(bannerTitle[bannerIndex])}
                  </AnimatedBox>
                </h2>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  {t("home.banner.form.secondLine")}
                </h2>
              </div>

              {/* <SelectInput
                label={t("home.banner.form.where")}
                list={emiratesList}
                register={register("location")}
              />
              <SelectInput
                label={t("home.banner.form.service")}
                list={serviceList}
                register={register("service")}
              /> */}

              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 ml-0"
                onClick={handleSubmit(onBannerSubmission)}
              >
                {t("common.button.search")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
