"use client";
import { Locale } from "../../types/i18n.type";
import { createContext } from "react";

interface TranslationContextType {
  dic: any;
  lang: Locale;
}

export const TranslationContext = createContext<TranslationContextType>({
  dic: {},
  lang: "en",
});

export const TranslationProvider = ({
  children,
  dic,
  lang,
}: {
  children: React.ReactNode;
  dic: any;
  lang: Locale;
}) => {
  return (
    <TranslationContext.Provider value={{ dic, lang }}>
      {children}
    </TranslationContext.Provider>
  );
};
