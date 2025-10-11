import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4 text-center">
        {/* Logo */}
        <div>
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <Image
              src="/logo.png"
              alt="Bhatia Calicut Logo"
              width={64}
              height={64}
            />
          </div>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          © Bhatia Calicut, all rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
