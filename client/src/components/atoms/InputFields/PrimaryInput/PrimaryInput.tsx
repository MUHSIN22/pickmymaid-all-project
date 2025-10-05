"use client";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "../../Icons/Icons";
import clsx from "clsx";

export default function PrimaryInput({
  label,
  errorMessage,
  register,
  required,
  type = "text",
  isDisabled,
  placeholder,
  isList,
  handleSuggestionClick,
  bg,
  ...inputStyles
}: {
  label?: string;
  errorMessage: string | undefined;
  register: any;
  required?: boolean;
  type?: string;
  isDisabled?: boolean;
  placeholder?: string;
  handleSuggestionClick?: any;
  isList?: string[];
  bg?: string;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isListActive, setListActive] = useState<boolean>(false);

  const handleSearchBoxAppearance = () => {
    document.addEventListener("click", (event) => {
      if (
        !(event?.target as any)?.className?.includes("search-input") &&
        !(event?.target as any)?.className?.includes("list-item")
      ) {
        setListActive(false);
      }
    });
  };

  useEffect(() => {
    handleSearchBoxAppearance();
  }, []);

  return (
    <div className="flex gap-2 flex-col items-start w-[100%]">
      {label && (
        <label className="label-primary">
          {label} {required && <span className="text-[red]">*</span>}{" "}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          disabled={isDisabled}
          placeholder={placeholder}
          className={clsx("text-input", inputStyles)}
          {...register}
        />
      ) : (
        <div className="relative w-[100%]">
          <input
            type={type === "password" && showPassword ? "text" : type}
            disabled={isDisabled}
            placeholder={placeholder}
            className={clsx("text-input", inputStyles)}
            {...register}
            list={`form_${label}_list`}
            onFocus={() => setListActive(true)}
          />
          {isListActive && isList && isList?.length > 0 && (
            <ul className="list absolute bottom-0 left-0 bg-white translate-y-[calc(100%+0.5rem)] list-none shadow-[0px_0px_10px_rgba(0,0,0,0.1)] m-0 min-w-[80%] overflow-hidden rounded-[8px] max-h-[10rem] overflow-y-scroll">
              {isList.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    handleSuggestionClick(item);
                  }}
                  className="text-description list-item p-[0.5rem] py-[0.3rem] hover:bg-[rgba(189,224,254,0.3)] cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          {type === "password" && (
            <span
              className="absolute right-2 top-1/2 transform-[translateY(-50%)] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          )}
        </div>
      )}

      {errorMessage && <p className="text-error text-[red]">{errorMessage}</p>}
    </div>
  );
}
