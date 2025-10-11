import React from "react";
import RadioCard from "./ChildrenRadio";

const ageGroups = [
  {
    label: "Newborn",
    name: "ageGroup",
    value: "newborn",
    description: "0-12 months",
    id: "1",
  },
  {
    label: "Toddler",
    name: "ageGroup",
    value: "Toddler",
    description: "1-3 years",
    id: "2",
  },
  {
    label: "Preschool",
    name: "ageGroup",
    value: "Preschool",
    description: "4-5 years",
    id: "3",
  },
  {
    label: "School Age",
    name: "ageGroup",
    value: "School Age",
    description: "6 year and above",
    id: "4",
  },
];

export default function ChildrenAge({
  setStep,
  childrenAge,
  setChildrenAge,
}: {
  setStep: any;
  childrenAge: any;
  setChildrenAge: any;
}) {
  const onSubmit = () => {
    setStep(3);
  };

  const handleRadioChange = (event: any) => {
    setChildrenAge(event.target.value);
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      <div>
        <p>Please select the age group of your child/children</p>
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        {ageGroups.map((item) => (
          <RadioCard
            id={item.id}
            label={item.label}
            name={item.name}
            value={item.value}
            description={item.description}
            key={item.id}
            onChange={handleRadioChange}
            checked={childrenAge === item.value}
          />
        ))}
      </div>
      <div className="flex justify-between mt-[1rem]">
        <button
          className="btn-ghost cursor-pointer"
          disabled={false}
          onClick={() => setStep(1)}
        >
          Back
        </button>
        <button className="btn-outlined ml-auto" onClick={onSubmit}>
          Next
        </button>
      </div>
    </div>
  );
}
