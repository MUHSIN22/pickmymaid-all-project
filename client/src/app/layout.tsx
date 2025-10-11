import type { Metadata } from "next";
import { Noto_Sans_New_Tai_Lue } from "next/font/google";
import "./globals.css";
import PrimaryTopNav from "@/components/atoms/Navigations/PrimaryTopNav/PrimaryTopNav";
import BottomNav from "@/components/atoms/Navigations/BottomNav/BottomNav";
import StoreProvider from "@/components/wrappers/StoreProvider";
import AuthModalWrapper from "@/components/molecules/Home/HomeSections/Wrappers/AuthModalWrapper";
import { Suspense } from "react";
import ToastContainerComponent from "@/components/atoms/toast-container/ToastContainer";
import FooterWrapper from "@/components/atoms/Footer/FooterWrapper";
import Script from "next/script";
import WhatsappButton from "@/components/atoms/whatsappButton/WhatsappButton";

const notoSansNewTaiLue = Noto_Sans_New_Tai_Lue({
  variable: "--font-noto-sans-new-tai-lue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hire Maids and Nannies in UAE | Pick My Maid UAE",
  description:
    "Pick My Maid - Find reliable Maids and Nannies for hire in the UAE. Trusted domestic staff ready to assist your family. Hire the best Maids and Nannies in Dubai, Sharjah, Abu Dhabi and other emirates in UAE",
  keywords: [
    "full time maids in dubai",
    "full time maids in dubai with own visa",
    "live out maid abu dhabi",
    "full time live out maid",
    "part time maids in dubai with own visa",
    "live out maid jobs in jumeirah",
    "full time indian maid in dubai",
    "full time maid service dubai",
    "full time housekeeper",
    "full time maid abu dhabi",
    "housemaid in abu dhabi",
    "maids full time",
    "part time maid abu dhabi",
    "hire maid",
    "hire nanny",
    "best maid service dubai",
    "live out maid dubai",
    "live out nanny dubai",
    "maid agency in dubai",
    "nanny agency dubai",
    "full time nanny in dubai",
    "find nanny dubai",
    "live in maid dubai",
    "live in nanny dubai",
  ],
  openGraph: {
    title: "Hire Maids and Nannies in UAE | Pick My Maid UAE",
    description:
      "Find reliable Maids and Nannies for hire in the UAE. Trusted domestic staff ready to assist your family.",
    images: [
      {
        url: "/logo.webp",
        alt: "Pick My Maid Logo",
      },
    ],
  },
  metadataBase: new URL("https://www.pickmymaid.com/"), // update to your actual domain
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansNewTaiLue.variable} antalized`}>
        <StoreProvider>
          <PrimaryTopNav />
          {children}
          <BottomNav />
          <FooterWrapper />
          <WhatsappButton />
          <Suspense>
            <AuthModalWrapper />
          </Suspense>
          <ToastContainerComponent />
        </StoreProvider>
        {/* Facebook Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt="pixel noscript"
            src="https://www.facebook.com/tr?id=1344507103340371&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
      <>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=AW-11255924314`}
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-11255924314');
  `}
        </Script>
        <Script id="clarity-script" strategy="lazyOnload">
          {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "i7ztkf13tk");
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1344507103340371');
            fbq('track', 'PageView');
            
          `}
        </Script>
      </>
    </html>
  );
}
