import clsx from "clsx";
import React from "react";

type HStackProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function HStack({ children, className, ...rest }: HStackProps) {
  return (
    <div className={clsx("flex flex-row gap-2", className)} {...rest}>
      {children}
    </div>
  );
}
