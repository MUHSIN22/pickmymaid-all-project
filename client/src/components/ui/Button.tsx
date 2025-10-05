import clsx from "clsx";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

export default function Button({
  className,
  children,
  LeftIcon,
  RightIcon,
  isLoading = false,
  loadingText = "Loading...",
  isDisabled,
  ...props
}: {
  className?: string;
  children: ReactNode;
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={isLoading || isDisabled}
      className={clsx(
        "inline-flex items-center justify-center disabled:opacity-50 transition-all",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : (
        <>
          {LeftIcon ? LeftIcon : null}
          {children}
          {RightIcon ? RightIcon : null}
        </>
      )}
    </button>
  );
}
