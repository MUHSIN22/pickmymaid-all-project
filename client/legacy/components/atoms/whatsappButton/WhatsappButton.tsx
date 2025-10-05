"use client";
import { Button } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";
import { Call, LogosWhatsappIcon } from "../Icons/Icons";

const WhatsappButton = () => {
  const pathname = usePathname();
  return (
    <div>
      {pathname.split("/")[2] !== "maid" && (
        <Button
          borderRadius="10px 10px 0 10px"
          bg="white"
          borderColor="white"
          boxShadow="0px 0px 15px rgba(0,0,0,0.2)"
          pos="fixed"
          aspectRatio={1 / 1}
          padding="0.8rem !important"
          height="auto"
          w="max-content"
          bottom={
            pathname.includes("search")
              ? "5rem"
              : { base: "4.5rem", lg: "3rem" }
          }
          right="0.5rem"
          zIndex={997}
          onClick={() => {
            window.location.href = "tel:+971566369736";
          }}
        >
          <Call fontSize="1rem" style={{ width: "25px", height: "25px" }} />
        </Button>
      )}
    </div>
  );
};

export default WhatsappButton;
