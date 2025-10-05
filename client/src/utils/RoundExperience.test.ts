import { it, describe, expect } from 'vitest';
import { GetRoundedExperience } from './RoundExperience';

describe(GetRoundedExperience, () => {
  it('passing number without decimalnumber', () => {
    expect(GetRoundedExperience(3)).toBe(3);
  });
  it('checking a decimal number thats length  number of more than 1', () => {
    expect(GetRoundedExperience(4.1888888)).toBe(4.2);
  });
});
