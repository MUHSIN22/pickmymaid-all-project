"use client";
import dynamic from "next/dynamic";
import React from "react";
const ContactForm = dynamic(() => import("./ContactForm"), { ssr: false });
export default function ContactFormWrapper() {
  return <ContactForm />;
}
