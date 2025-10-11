import React, { ElementType } from "react";
import { EducateIcon, ProvenIcon } from "../utilities/Icons";

export default function AboutCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: ElementType;
}) {
  return (
    <div className="flex flex-col text-black items-center w-[100%] p-[2rem] rounded-[25px] border-[2px] border-[#F3F4F6] bg-white gap-[1rem]">
      <div className="aspect-square bg-primary-50 p-[0.5rem] rounded-full">
        <Icon className="text-primary-500" width={30} height={30} />
      </div>
      <h6 className="body-text font-semibold text-center">{title}</h6>
      <p className="caption text-gray font-[500] text-center">{description}</p>
    </div>
  );
}
