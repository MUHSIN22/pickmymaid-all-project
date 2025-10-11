import ContactUs from "../../components/molecules/ContactUs/ContactUs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Pick My Maid Team",
  description: `Reach out to us today for inquiries, assistance, or to discuss hiring maids and nannies in the UAE. We're here to help you find trusted domestic help.`,
};

export default function page() {
  return (
    <div>
      <ContactUs />
    </div>
  );
}
