import React from "react";
import dropdownIcon from "@/assets/icons/others/dropdown.svg";
import Image from "next/image";
interface AccordianProps {
    title: React.ReactNode;
    description: React.ReactNode;
}

function Accordian({ title, description }: AccordianProps) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
        <div className="border-t border-gray-200">
            <div
                className="flex items-center justify-between cursor-pointer hover:bg-gray-200 p-2"
                onClick={() => setIsExpanded(!isExpanded)}>
                {title}
                {isExpanded ? (
                    <Image
                        src={dropdownIcon}
                        alt="dropdown"
                        width={20}
                        height={20}
                        className="rotate-180"
                    />
                ) : (
                    <Image
                        src={dropdownIcon}
                        alt="dropdown"
                        width={20}
                        height={20}
                        className="rotate-0"
                    />
                )}
            </div>
            <div className={`overflow-x-hidden transition-height duration-1000 overflow-y-auto ${isExpanded ? "max-h-[100vh]  h-auto" : "max-h-0  h-0"}`}>
                {description}
            </div>
        </div>
    );
}

export default Accordian;
