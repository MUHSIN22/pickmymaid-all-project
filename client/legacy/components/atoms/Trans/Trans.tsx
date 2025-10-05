import React from "react";
import parse from "html-react-parser";

const Trans = ({ children }: { children: string; components?: any }) => {
    return <div>{parse(children)}</div>;
};

export default Trans;
