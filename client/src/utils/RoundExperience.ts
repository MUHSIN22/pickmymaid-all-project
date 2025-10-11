export const GetRoundedExperience = (experience: number) => {
  if (experience % 1 === 0) return experience;
  else return Number(experience.toFixed(1));
};
