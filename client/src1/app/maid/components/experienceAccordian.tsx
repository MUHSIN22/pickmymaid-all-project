import React from "react";
interface IExperienceAccordian {
  location: string;
  experiance: number;
  reason_leaving: string;
  job_description: string;
}
const ExperienceAccordian = ({ location, experiance, reason_leaving, job_description }: IExperienceAccordian) => {
  return (
    <div className="pb-4">
      <h2 className="text-md font-bold">Location</h2>
      <p>{location}</p>
      <h2 className="text-md font-bold">Duration</h2>
      <p>{experiance} yr</p>
      <h2 className="text-md font-bold">Reason for Leaving</h2>
      <p>{reason_leaving}</p>
      <h2 className="text-md font-bold">Description</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: job_description,
        }}>
      </div>
    </div>
  );
};

export default ExperienceAccordian;
