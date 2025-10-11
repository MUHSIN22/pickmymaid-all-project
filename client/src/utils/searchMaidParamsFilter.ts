const wordsToKeep = [
  'maids',
  'nannies',
  'housemaids',
  'caregiver',
  'private-nurse',
  'private-tutor',
  'driver',
  'pospartum-care',
  'cook',
  'abudhabi',
  'dubai',
  'sharjah',
  'ajman',
  'umm-al-quwain',
  'ras-al-khaimah',
  'fujairah',
  'al-ain'
];

export const filterSearchParams = (params: string): string[] => {
  const regexPattern = new RegExp(`\\b(${wordsToKeep.join('|')})\\b`, 'g');
  const matches = params.match(regexPattern);

  return matches as string[];
};
