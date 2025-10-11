"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Call } from "../Icons/Icons";

const WhatsappButton = () => {
  const pathname = usePathname();
  return (
    <div>
      {pathname.split("/")[1] !== "maid" && (
        <button
          className="rounded-[10px_10px_0_10px] p-[0.8rem] w-[max-content] right-[0.5rem] z-[997]  bg-white border-white shadow-[0px_0px_15px_rgba(0,0,0,0.2)] fixed aspect-square h-auto "
          style={{
            bottom: '5rem',
            right: "0.5rem",
            zIndex: 997,
          }}
          onClick={() => {
            window.location.href = "tel:+971566369736";
          }}>
          <Call
            fontSize="1rem"
            style={{ width: "25px", height: "25px" }}
          />
        </button>
      )}
    </div>
  );
};

export default WhatsappButton;
