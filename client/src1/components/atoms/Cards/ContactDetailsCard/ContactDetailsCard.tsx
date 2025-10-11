import VStack from "../../../ui/VStack";
import Link from "next/link";

export default function ContactDetailsCard({
  title,
  link,
  text,
}: {
  title: string;
  link: string;
  text: string;
}) {
  return (
    <VStack className="items-start max-w-[100%] sm:max-w-[15rem] border-l-[2px] border-[rgba(0,0,0,0.1)] pl-4">
      <h3 className="heading-smaller">{title}</h3>
      <Link href={link} target="_blank" className="text-description">
        {text?.split("<br>").map((content, index) => {
          return (
            <span key={content}>
              {content}
              {index !== text?.split("<br/>").length && <br />}
            </span>
          );
        })}
      </Link>
    </VStack>
  );
}
