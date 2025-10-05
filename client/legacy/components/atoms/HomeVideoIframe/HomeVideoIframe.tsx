import React from "react";

export const HomeVideoIframe = () => {
  return (
    <iframe
      loading="lazy"
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/IsDePiBUyhc?rel=0"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    />
  );
};
