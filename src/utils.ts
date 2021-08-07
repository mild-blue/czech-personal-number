export interface PersonalNumberParts {
  firstPart: string;
  secondPart: string;
}

export const personalNumberAddingTwentyIssueYear = 4;
export const tenDigitPersonalNumberIssueYear = 54;
export const womanMonthAddition = 50;
export const unprobableMonthAddition = 20;

export const getPersonalNumberParts = (value: string): PersonalNumberParts => {
  let firstPart = '';
  let secondPart = '';

  const parts = value.split('/');
  if (parts.length === 1) {
    firstPart = value.substr(0, 6);
    secondPart = value.substr(6);
  } else {
    firstPart = parts[0];
    secondPart = parts[1];
  }

  return { firstPart, secondPart };
};

export const getAge = (dateOfBirth: Date): number => {
  const ageDifMs = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageDifMs);
  const year = 1970;
  return Math.abs(ageDate.getUTCFullYear() - year);
};
