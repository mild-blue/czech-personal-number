import { PersonalNumberParts } from './model/PersonalNumberParts.interface';
import { tenDigitPersonalNumberIssueYear } from './model/constants';

export const splitPersonalNumberValue = (value: string): PersonalNumberParts => {
  let firstPart = '';
  let secondPart = '';

  const parts = value.split('/');
  if (parts.length === 1) {
    firstPart = value.substr(0, 6);
    secondPart = value.substr(6);
  } else if (parts.length === 2) {
    firstPart = parts[0];
    secondPart = parts[1];
  }

  return { firstPart, secondPart };
};

export const getFullBirthYear = (secondPart: string, year: number): number => {
  let fullYear = 1900 + year;

  if (secondPart.length === 3 && year >= tenDigitPersonalNumberIssueYear) {
    fullYear = 1800 + year;
  } else if (secondPart.length === 4 && year < tenDigitPersonalNumberIssueYear) {
    fullYear = 2000 + year;
  }

  return fullYear;
};

export const getAge = (dateOfBirth: Date): number => {
  const today = new Date();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  return age;
};

export const getDateOfBirth = (year: number, month: number, day: number): Date | false => {
  const now = new Date();
  try {
    const dateOfBirth = new Date(year, month - 1, day);
    return dateOfBirth <= now ? dateOfBirth : false;
  } catch {
    return false;
  }
};
