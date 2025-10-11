import Image from "../../atoms/NextImageWrapper/Image";
import VStack from "../../ui/VStack";
import React from "react";
import contactSupportImg from "@/assets/images/contact us/support.jpg";
import clsx from "clsx";
import ContactDetailsCard from "../../atoms/Cards/ContactDetailsCard/ContactDetailsCard";
import ContactForm from "../../atoms/Forms/ContactForm/ContactForm";
import ContactFormWrapper from "../../atoms/Forms/ContactForm/ContactFormWrapper";

export default function ContactUs({ hideImage }: { hideImage?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4">
      <VStack className="gap-4 sm:gap-8 items-center">
        <Image
          src={contactSupportImg.src}
          parentClass={clsx(
            "aspect-[2/1] w-[100%]",
            hideImage ? "hidden sm:block" : ""
          )}
          alt="Pickmymaid Contact support"
        />
        <div className="grid grid-cols-[repeat(2,1fr)] sm:grid-cols-[repeat(3,1fr)] gap-2 sm:gap-4 md:gap-8 justify-between sm:justify-center lg:justify-start w-[100%] px-[5%]">
          <ContactDetailsCard
            key={1}
            title="Location"
            link="https://maps.app.goo.gl/srnQ1rbhvCoXE4bP8?g_st=iwb"
            text="The Iridium Building, Al Barsha, Dubai, United Arab Emirates"
          />
          <ContactDetailsCard
            key={2}
            title="Opening Hours"
            link=""
            text="Monday to Sunday,<br> 9:00 AM – 10:00 PM"
          />
          <ContactDetailsCard
            key={3}
            title="Email"
            link="mailto:support@pickmymaid.com"
            text="support@pickmymaid.com"
          />
          <ContactDetailsCard
            key={4}
            title="Call Us"
            link="tel:+971566369736"
            text="+971 566369736"
          />
        </div>
      </VStack>
      <div className="flex justify-center items-center p-4">
        <ContactFormWrapper />
      </div>
    </div>
  );
}
