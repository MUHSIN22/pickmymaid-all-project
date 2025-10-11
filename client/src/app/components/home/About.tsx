import React from "react";
import AboutCard from "../UI/AboutCard";
import { ExpertIcon, ProvenIcon, ResultIcon } from "../utilities/Icons";

const cards = [
  {
    title: "Proven Legacy",
    description:
      "Over 25 years of experience in shaping top medical professionals across India.",
    icon: ProvenIcon,
  },
  {
    title: "Expert Mentorship",
    description:
      "Learn directly from India’s most trusted faculty who simplify complex concepts and guide you personally.",
    icon: ExpertIcon,
  },
  {
    title: "Results That Speak",
    description:
      "Thousands of successful selections every year reflect our commitment to your success.",
    icon: ResultIcon,
  },
];

export default function About() {
  return (
    <div className="flex justify-center w-[100%] scroll-mt-30" id="about">
      <div className="common-x-spacing flex flex-col items-center gap-[2rem] md:gap-[4rem]">
        <div className="flex flex-col items-center justify-center gap-[1rem] text-center">
          <h2 className="heading text-dark font-[700]">
            Why choose Bhatia Calicut?
          </h2>
          <p className="caption text-gray font-[500] max-w-[55rem]">
            The right guidance makes all the difference. Here’s why thousands of
            aspirants trust us for their NEET PG journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1rem] md:gap-[2rem]">
          {cards.map((card, index) => (
            <AboutCard
              key={index}
              title={card.title}
              description={card.description}
              Icon={card.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
