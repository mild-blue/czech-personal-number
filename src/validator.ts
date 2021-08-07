import { getPersonalNumberParts, personalNumberAddingTwentyIssueYear, tenDigitPersonalNumberIssueYear, unprobableMonthAddition, womanMonthAddition } from './utils';

const validateDate = (year: number, month: number, day: number): boolean => {
  const fullYear = year >= tenDigitPersonalNumberIssueYear ? 1900 + year : 2000 + year;
  try {
    const _ = new Date(fullYear, month - 1, day);
    return true;
  } catch {
    return false;
  }
};

/**
 * Personal number validator
 *
 * @param value - The personal number with or without a slash symbol.
 * @returns true if value is a valid personal number, false if value is not a valid personal number.
 */
export const validate = (value: string): boolean => {
  if (!value) {
    return false;
  }

  const { firstPart, secondPart } = getPersonalNumberParts(value);

  if (firstPart.length !== 6 || isNaN(Number(firstPart)) || isNaN(Number(secondPart))) {
    return false;
  }

  const year = Number(firstPart.substr(0, 2));
  let month = Number(firstPart.substr(2, 2));
  const day = Number(firstPart.substr(4, 2));

  const currentYear = new Date().getFullYear() % 100;

  if (year >= tenDigitPersonalNumberIssueYear || year <= currentYear) {
    if (secondPart.length === 4) {
      const controlDigit = Number(secondPart.substr(3, 1));
      const concatenated = Number(firstPart + secondPart);

      const moduloElevenOk = concatenated % 11 === 0;
      const withoutLastDigit = concatenated / 10;
      const moduloTenOk = withoutLastDigit % 11 === 10 && controlDigit === 0;

      if (!moduloTenOk && !moduloElevenOk) {
        return false;
      }
    } else {
      return false;
    }
  } else {
    if (secondPart.length !== 3) {
      return false;
    }
  }
  if (month > womanMonthAddition) {
    month -= womanMonthAddition;
  }

  if (month > unprobableMonthAddition) {
    if (year >= personalNumberAddingTwentyIssueYear) {
      month -= unprobableMonthAddition;
    } else {
      return false;
    }
  }

  return validateDate(year, month, day);
};
