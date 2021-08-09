import { getFullBirthYear, getPersonalNumberParts, personalNumberAddingTwentyIssueYear, unprobableMonthAddition, womanMonthAddition } from './utils';

const validateDate = (year: number, month: number, day: number): boolean => {
  try {
    const _ = new Date(year, month - 1, day);
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
  const isFirstPartCorrect = firstPart.length === 6;
  const isSecondPartCorrect = secondPart.length === 3 || secondPart.length === 4;

  if (!isFirstPartCorrect || !isSecondPartCorrect) {
    return false;
  }

  const year = Number(firstPart.substr(0, 2));
  let month = Number(firstPart.substr(2, 2));
  const day = Number(firstPart.substr(4, 2));

  if (secondPart.length === 4) {
    const controlDigit = Number(secondPart.substr(3, 1));
    const concatenated = Number(firstPart + secondPart);

    const moduloElevenOk = concatenated % 11 === 0;
    const withoutLastDigit = concatenated / 10;
    const moduloTenOk = withoutLastDigit % 11 === 10 && controlDigit === 0;

    if (!moduloTenOk && !moduloElevenOk) {
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

  return validateDate(getFullBirthYear(secondPart, year), month, day);
};
