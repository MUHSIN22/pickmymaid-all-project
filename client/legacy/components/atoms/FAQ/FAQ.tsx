"use client";
import { useTranslation } from "@/lib/hooks/useTranslation";
import FAQAccordion from "@/components/atoms/Accordions/FAQAccordion/FAQAccordion";
import './FAQ.scss';

export default function FAQ() {
  const { t } = useTranslation();
  return (
    <div className="faq">
      <div className="faq__header">
        <h1 className="faq__title">
          {t("home.faq.heading")}
        </h1>
        <p className="faq__subtitle">{t("home.faq.subHeading")}</p>
      </div>

      <FAQAccordion />
    </div>
  );
}
