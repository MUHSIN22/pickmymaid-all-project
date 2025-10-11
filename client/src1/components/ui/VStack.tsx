import clsx from "clsx";
import React from "react";

type VStackProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function VStack({ children, className, ...rest }: VStackProps) {
  return (
    <div className={clsx("flex flex-col gap-2", className)} {...rest}>
      {children}
    </div>
  );
}
