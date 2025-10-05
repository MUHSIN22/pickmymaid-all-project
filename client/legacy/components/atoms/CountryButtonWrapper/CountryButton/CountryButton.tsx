"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { getAlternativeText } from "@/utils/altSelector";
import { useRouter } from "next/navigation";
import "./CountryButton.scss";

interface CountryButtonProps {
  flag: string;
  country: string;
  count: number;
  query: string;
  isGrayBG: boolean;
  borderVisible?: boolean;
  isDull?: boolean;
}

export default function CountryButton({
  flag,
  country,
  count,
  query,
  isGrayBG,
  borderVisible = false,
  isDull = false,
}: CountryButtonProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const buttonClasses = [
    "country-button",
    isGrayBG ? "" : "country-button--gray-bg",
    borderVisible ? "country-button--border-visible" : "",
    isDull ? "country-button--dull" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const flagClasses = [
    "country-button__flag",
    borderVisible ? "country-button__flag--border-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const countryClasses = [
    "country-button__country",
    borderVisible ? "country-button__country--border-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const countClasses = [
    "country-button__count",
    borderVisible ? "country-button__count--border-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={() => router.push(`/search?nationality=${query}`)}
    >
      <div className="country-button__content">
        <div className={flagClasses}>
          <Image
            src={flag}
            alt={getAlternativeText()}
            width={32}
            height={32}
            objectFit="cover"
            unoptimized // remove this if your images are from Next domains or handled properly
          />
        </div>
        <div className="country-button__text-container">
          <div className={countryClasses}>{t(country)}</div>
          <div className={countClasses}>
            {count} {t("common.professionals")}
          </div>
        </div>
      </div>
    </button>
  );
}