"use client";

import { ISelectOption } from "../../../../types/components/selectInput/selectInput.types";
import clsx from "clsx";

export default function SelectInput({
  label,
  list,
  register,
  errorMessage,
  required,
}: {
  label: string;
  list: ISelectOption[];
  register: any;
  required?: boolean;
  errorMessage?: string;
}) {
  const inputId = label.toLowerCase().replace(/\s+/g, "_");

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={inputId}
        className={clsx(
          "text-sm font-medium",
          required && "after:content-['*'] after:ml-1 after:text-red-500"
        )}
      >
        {label}
      </label>

      <select
        id={inputId}
        {...register}
        className={clsx(
          "w-full px-4 py-2 rounded-md border text-sm",
          "bg-white text-black dark:bg-gray-800 dark:text-white",
          errorMessage
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500",
          "focus:outline-none focus:ring-2 transition-all duration-200"
        )}
      >
        <option value="">{/* Select Option */}Select an option</option>
        {list.map((listItem) => (
          <option key={listItem.id} value={listItem.value}>
            {listItem.option}
          </option>
        ))}
      </select>

      {errorMessage && (
        <p className="text-error text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
