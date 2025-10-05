
import { memo } from "react";
import indianFlag from "@/assets/icons/flags/india.webp";
import philippineFlage from "@/assets/icons/flags/philippines.webp";
import sriLankanFlag from "@/assets/icons/flags/sri-lanka.webp";
import indonesianFlag from "@/assets/icons/flags/indonesia.webp";
import nepalianFlag from "@/assets/icons/flags/nepal.webp";
import "./CountryButtonWrapper.scss";
import CountryButton from "./CountryButton/CountryButton";
import { ICounts } from "@/app/page";

type IProps = {
  grayBg?: boolean;
  count: ICounts;
};

function CountryButtonWrapper({ grayBg, count }: IProps) {
  const nationalityCount = count?.nationalityCounts;
  let sortedCount;
  if (nationalityCount) {
    const sorted: { [key: string]: number } = {};
    for (let i = 0; i < nationalityCount.length; i++) {
      const item = nationalityCount[i];
      if (item?.id) {
        sorted[item?.id] = item.count;
      }
    }
    sortedCount = sorted;
  }

  return (
    <div className={`country-wrapper ${grayBg ? "gray-bg" : "white-bg"}`}>
      <CountryButton
        query="Philippines"
        flag={philippineFlage.src}
        country="Filipino"
        count={sortedCount?.Philippines || 0}
        isGrayBG={!!grayBg}
      />
      <CountryButton
        query="India"
        flag={indianFlag.src}
        country="Indian"
        count={sortedCount?.India || 0}
        isGrayBG={!!grayBg}
      />
      <CountryButton
        query="Nepal"
        flag={nepalianFlag.src}
        country="Nepali"
        count={sortedCount?.Nepal || 0}
        isGrayBG={!!grayBg}
      />
      <CountryButton
        query="Srilanka"
        flag={sriLankanFlag.src}
        country="Srilankan"
        count={sortedCount?.Srilanka || 0}
        isGrayBG={!!grayBg}
      />
      <CountryButton
        query="Indonesia"
        flag={indonesianFlag.src}
        country="Indonesian"
        count={sortedCount?.Indonesia || 0}
        isGrayBG={!!grayBg}
      />
    </div>
  );
}

export default memo(CountryButtonWrapper);
