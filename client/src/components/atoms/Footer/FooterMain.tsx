"use client";
import { findWorkers, quickLink } from "./footermain.data";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTwitterXFill,
  RiWhatsappFill,
  RiYoutubeFill,
} from "../Icons/Icons";
import securedPayment from "@/assets/images/footer-payment.png";
import VStack from "@/components/ui/VStack";
import Image from "next/image";
import Link from "next/link";
import HStack from "@/components/ui/HStack";

export default function FooterMain() {
  return (
    <div className="common-padding mt-4 sm:mt-6 py-8 pb-5 sm:pb-8 bg-primary-300">
      <div className="grid grid-cols-[1fr] sm:grid-cols-[1.5fr_auto_1fr_1.5fr_1fr] gap-4 sm:gap-8">
        <VStack>
          <Link href="/">
            <Image
              src="/logo/logo-white.webp"
              alt="Pickmymaid logo white"
              width={160}
              height={40}
            />
          </Link>
          <p className="text-footer text-white">
            Pickmymaid is the #1 maid platform in UAE. Access the best profiles
            with comprehensive information, including recommendations, to find
            your ideal nanny or maid. Connect directly with them, eliminating
            costly agency fees and saving thousands of dirhams.
          </p>
          <HStack className="">
            <RiFacebookCircleFill className="text-footer cursor-pointer text-[#424141] hover:text-black-900 transition-all duration-300 ease" />
            <RiInstagramFill className="text-footer cursor-pointer text-[#424141] hover:text-black-900 transition-all duration-300 ease" />
            <RiLinkedinBoxFill className="text-footer cursor-pointer text-[#424141] hover:text-black-900 transition-all duration-300 ease" />
            <RiTwitterXFill className="text-footer cursor-pointer text-[#424141] hover:text-black-900 transition-all duration-300 ease" />
            <RiYoutubeFill className="text-footer cursor-pointer text-[#424141] hover:text-black-900 transition-all duration-300 ease" />
            {/* <RiWhatsappFill className="text-footer cursor-pointer text-[#424141] hover:text-black-900 transition-all duration-300 ease" /> */}
          </HStack>
        </VStack>

        <div></div>

        <HStack className="items-start justify-between w-[100%]">
          <div>
            <h3 className="heading-footer-title mb-4">Quick Links</h3>
            <VStack>
              {quickLink.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="text-footer text-white"
                >
                  {item.title}
                </Link>
              ))}
            </VStack>
          </div>

          <div className="block sm:hidden">
            <h3 className="heading-footer-title mb-4">Support</h3>
            <VStack>
              <p className="text-footer font-[500] text-white">
                Call Us:{" "}
                <Link
                  href="tel:+971566369736"
                  className="text-footer text-white"
                >
                  +971 566369736
                </Link>
              </p>
              <p className="text-footer text-white">
                Email:{" "}
                <Link
                  href="mailto:support@pickmymaid.com"
                  className="text-footer text-white"
                >
                  support@pickmymaid.com
                </Link>
              </p>
            </VStack>
          </div>
        </HStack>

        <div>
          <h3 className="heading-footer-title mb-4">Find Workers</h3>
          <div className="flex gap-6">
            <VStack>
              {findWorkers.map(
                (item, index) =>
                  index <= 4 && (
                    <Link
                      key={index}
                      href={item.path}
                      className="text-footer text-white"
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </VStack>
            <VStack>
              {findWorkers.map(
                (item, index) =>
                  index > 4 && (
                    <Link
                      key={index}
                      href={item.path}
                      className="text-footer text-white"
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </VStack>
          </div>
        </div>

        <div className="hidden sm:block">
          <h3 className="heading-footer-title mb-4">Support</h3>
          <VStack>
            {/* <p className="text-footer font-[500] text-white">
              Whatsapp:{" "}
              <Link href="tel:+971566369736" className="text-footer text-white">
                +971 566369736
              </Link>
            </p> */}
            <p className="text-footer text-white">
              Email:{" "}
              <Link
                href="mailto:support@pickmymaid.com"
                className="text-footer text-white"
              >
                support@pickmymaid.com
              </Link>
            </p>
          </VStack>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center items-center">
        <Image
          src={securedPayment.src}
          width="370"
          height="90"
          alt="accepted payments"
        />
        <hr className="w-full bg-white border-white mb-4" />
        <p className="text-footer">
          &copy; {new Date().getFullYear()} Pickmymaid. All rights reserved -
          License Number: 2323666.01
        </p>
      </div>
    </div>
  );
}
