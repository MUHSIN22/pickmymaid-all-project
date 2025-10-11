import clsx from "clsx";
import React from "react";

export default function BottomNavButton({
  label,
  path,
  pathname,
  FillIcon,
  OutlineIcon,
  onClick,
  iconClass,
  mainClass,
  labelClass,
}: {
  label: string;
  path?: string;
  pathname?: string;
  FillIcon: any;
  OutlineIcon: any;
  onClick?: () => void;
  iconClass?: string;
  mainClass?: string;
  labelClass?: string;
}) {
  return (
    <div
      key={label}
      className={clsx(
        "flex flex-col gap-1 self-center user-select-none outline-none justify-between items-center",
        mainClass
      )}
      onClick={onClick}
    >
      {pathname && [path, `${path}/`].includes(pathname) ? (
        <FillIcon className={clsx("w-5", iconClass)} />
      ) : (
        <OutlineIcon className={clsx("w-5", iconClass)} />
      )}
      <p className={clsx("text-[0.85rem] text-white", labelClass)}>{label}</p>
    </div>
  );
}
