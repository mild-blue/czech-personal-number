import { getAge, getPersonalNumberParts, tenDigitPersonalNumberIssueYear, unprobableMonthAddition, womanMonthAddition } from './utils';
import { validate } from './validator';

export interface PersonalNumberParseResult {
  age: number;
  dateOfBirth: Date;
  gender: Gender;
  birthOrder: number;
  controlDigit: number | undefined;
}

export enum Gender {
  F = 'F',
  M = 'M'
}

/**
 * Personal number parser. Returns age, date of birth, gender, birth order from that day, and a control digit from given personal number.
 *
 * @param value - The personal number with or without a slash symbol.
 * @returns PersonalNumberParseResult if value is a valid personal number, undefined if value is not a valid personal number.
 */
export const parse = (value: string): PersonalNumberParseResult | undefined => {
  if (!validate(value)) {
    return undefined;
  }

  const { firstPart, secondPart } = getPersonalNumberParts(value);

  const year = Number(firstPart.substr(0, 2));
  let month = Number(firstPart.substr(2, 2));
  const day = Number(firstPart.substr(4, 2));
  const birthOrder = Number(secondPart.substr(0, 3));
  const controlDigit = secondPart.length === 4 ? Number(secondPart.substr(3, 1)) : undefined;

  let gender: Gender = Gender.M;
  if (month > womanMonthAddition) {
    gender = Gender.F;
    month -= womanMonthAddition;
  }

  if (month > unprobableMonthAddition) {
    month -= unprobableMonthAddition;
  }

  const fullYear = year >= tenDigitPersonalNumberIssueYear || secondPart.length === 3 ? 1900 + year : 2000 + year;
  const dateOfBirth = new Date(fullYear, month - 1, day);

  return {
    age: getAge(dateOfBirth),
    dateOfBirth,
    gender,
    birthOrder,
    controlDigit
  };
};
