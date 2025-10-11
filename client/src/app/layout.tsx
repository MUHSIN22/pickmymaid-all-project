
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import StickyBannerWrapper from "./components/StickyBannerWrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhatia Calicut",
  description: "india's most trusted symbol in neet pg/next preparation since 1996",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
      <StickyBannerWrapper />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
