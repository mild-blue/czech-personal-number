import { getAge, getDateOfBirth, getFullBirthYear, splitPersonalNumberValue } from './utils';
import { PersonalNumberParseResult } from './model/PersonalNumberParseResult.interface';
import { Gender } from './model/Gender.enum';
import { personalNumberAddingTwentyIssueYear, unprobableMonthAddition, womanMonthAddition } from './model/constants';

/**
 * Personal number parser. Returns age, date of birth, gender, birth order from that day, and a control digit from given personal number.
 *
 * @param value - The personal number with or without a slash symbol.
 * @returns PersonalNumberParseResult if value is a valid personal number, undefined if value is not a valid personal number.
 */
export const parse = (value: string): PersonalNumberParseResult | undefined => {
  if (!value) {
    return undefined;
  }

  const { firstPart, secondPart } = splitPersonalNumberValue(value);
  const isFirstPartCorrect = firstPart.length === 6;
  const isSecondPartCorrect = secondPart.length === 3 || secondPart.length === 4;

  if (!isFirstPartCorrect || !isSecondPartCorrect) {
    return undefined;
  }

  // Get control digit
  const controlDigit = secondPart.length === 4 ? Number(secondPart.substr(3, 1)) : undefined;

  // Validate second part if there is control digit
  if (controlDigit !== undefined) {
    const concatenated = Number(firstPart + secondPart);

    const moduloElevenOk = concatenated % 11 === 0;
    const withoutLastDigit = concatenated / 10;
    const moduloTenOk = withoutLastDigit % 11 === 10 && controlDigit === 0;

    if (!moduloTenOk && !moduloElevenOk) {
      return undefined;
    }
  }

  // Get month
  let month = Number(firstPart.substr(2, 2));

  // Get gender
  let gender: Gender = Gender.M;
  if (month > womanMonthAddition) {
    gender = Gender.F;
    month -= womanMonthAddition;
  }

  // Get year
  const year = getFullBirthYear(secondPart, Number(firstPart.substr(0, 2)));

  // Remove unprobableMonthAddition if there is one
  if (month > unprobableMonthAddition) {
    if (year >= personalNumberAddingTwentyIssueYear) {
      month -= unprobableMonthAddition;
    } else {
      return undefined;
    }
  }

  // Get day
  const day = Number(firstPart.substr(4, 2));

  // Get date of birth
  const dateOfBirth = getDateOfBirth(year, month, day);
  if (!dateOfBirth) {
    return undefined;
  }

  // Get birth order
  const birthOrder = Number(secondPart.substr(0, 3));

  // Get age
  const age = getAge(dateOfBirth);

  return {
    age,
    dateOfBirth,
    gender,
    birthOrder,
    controlDigit
  };
};
