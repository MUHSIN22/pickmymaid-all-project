"use client";
import React, { useEffect, useState } from "react";
import Image from "./Image";
import Link from "next/link";
import clsx from "clsx";
import { Menu, X } from "lucide-react"; // hamburger + close icons

const menu = [
  {
    title: "Home",
    href: "#banner",
  },
  {
    title: "About Us",
    href: "#about",
  },
  {
    title: "Faculties",
    href: "#faculties",
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        "w-full fixed top-0 left-0 z-50 transition-colors pt-[7rem] lg:pt-[4rem]",
        scrolled &&
          "bg-white/30 backdrop-blur-md border-b border-white/20 shadow-md"
      )}
    >
      <div className="common-x-spacing">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <Image
              src={scrolled ? "/logo-invert.png" : "/logo.png"}
              alt="Bhatia Calicut Logo"
              parentClass="aspect-[1.5/1] w-[6rem] h-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={clsx(
                  "body-text font-semibold transition-colors",
                  scrolled ? "text-black" : "text-white"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
          >
            {isOpen ? (
              <X size={28} className={clsx(scrolled && "text-black")} />
            ) : (
              <Menu size={28} className={clsx(scrolled && "text-black")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-6 text-white w-[90%] h-max p-[2rem] top-[7rem] left-[5%] rounded-[25px]">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="body-text font-semibold"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
