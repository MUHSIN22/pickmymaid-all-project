import React from "react";

export default function FacultyCard({
  name,
  subject,
  description,
  image,
}: {
  name: string;
  subject: string;
  description?: string;
  image: string;
}) {
  console.log({ image });
  return (
    <div
      className="text-blac overflow-hidden aspect-[2/3] rounded-[25px] flex flex-col items-center justify-end gap-[1rem] p-[1rem] relative"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundColor: "#86c3f0",
      }}
    >
      <div className="absolute bottom-0 left-0 h-[70%] p-[1.5rem] flex flex-col gap-[2px] items-start justify-end w-full rounded-[0_0_25px_25px] block bg-[linear-gradient(0deg,rgba(18,18,18,1)_0%,rgba(18,18,18,0.70)_60%,rgba(18,18,18,0)_100%)]">
        <h6 className="body-text font-bold! text-white!">{name}</h6>
        <p className="body-text text-white font-[500]">{subject}</p>
        {description && (
          <>
            <hr className="border-white w-[100%] my-[0.5rem]" />
            <p className="caption text-white! font-[500]">{description}</p>
          </>
        )}
      </div>
    </div>
  );
}
