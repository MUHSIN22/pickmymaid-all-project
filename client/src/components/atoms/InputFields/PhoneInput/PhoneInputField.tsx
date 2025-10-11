"use client";
import { useController } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./PhoneInputField.css";

export default function PhoneInputField({
  name,
  control,
  rules,
  required,
  isUAEOnly,
}: {
  name: string;
  control: any;
  rules: any;
  required?: boolean;
  isUAEOnly?: boolean;
}) {
  const {
    fieldState: { error },
    field: { onChange, value },
  } = useController({
    control,
    rules,
    name,
  });

  const handlePhoneChange = (phone: string) => {
    onChange(phone?.replace("+", ""));
  };

  return (
    <div className="flex gap-2 flex-col items-start w-full">
      <label className="label-primary">
        Phone {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full">
        <PhoneInput
          defaultCountry="ae"
          value={value}
          onChange={handlePhoneChange}
          className="telephone-input w-full"
        />
      </div>
      {error?.message && (
        <p className="text-error text-red-500">{error.message}</p>
      )}
    </div>
  );
}
