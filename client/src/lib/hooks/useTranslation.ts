"use client";

import { TranslationContext } from "@/lib/providers/translation-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

export const useTranslation = () => {
  const { dic, lang } = useContext(TranslationContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const i18n = {
    dir: (): "rtl" | "ltr" => {
      return lang === "ar" ? "rtl" : "ltr";
    },
  };
  const t = (path: string) => {
    const arr = path?.split(".");
    const value = arr?.reduce((acc: any, key: string) => acc?.[key], dic);
    return value ?? path;
  };
  const changeLang = (lang: string) => {
    const newPathname = pathname.split("/");
    newPathname[1] = lang;
    const newUrl = `${newPathname.join("/")}?${searchParams.toString()}`;
    router.push(newUrl);
  };
  return { t, i18n, changeLang };
};
