import Link from "next/link";
import Image from "../../NextImageWrapper/Image";
import PrimaryTopNavWrapper from "./PrimaryTopNavWrapper";

export default async function PrimaryTopNav() {
  return (
    <div className="flex items-center sticky top-0 left-0 z-[1500] justify-between py-2 md:py-4 px-4 md:px-6 lg:px-8 2xl:px-32 pb-1 md:pb-4 w-[max-content] md:w-[100%] h-[4rem] md:h-[5rem] bg-transparent lg:bg-white shadow-none lg:shadow-[0px_0px_12.0198px_rgba(0,0,0,0.2)]">
      <Link href="/">
        <Image
          src="/logo/logo-orange.webp"
          alt="pickmymaid"
          parentClass="w-[8rem] md:w-[11rem] aspect-[155/42]"
        />
      </Link>
      <PrimaryTopNavWrapper />
    </div>
  );
}
