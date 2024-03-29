import { getAge, getDateOfBirth, getFullBirthYear, splitPersonalNumberValue } from './utils';
import { Gender } from './model/Gender.enum';
import { improbableMonthAddition, personalNumberAddingTwentyIssueYear, womanMonthAddition } from './model/constants';
import { ParsingResult } from './model/ParsingResult.interface';

/**
 * Personal number parser. Returns age, date of birth, gender, birth order from that day and a control digit from given personal number.
 *
 * @param value - The personal number with or without a slash symbol.
 * @returns ParsingResult
 * If value is a valid personal number, ParsingResult.result will set to parsing result.
 * If value is not a valid personal number, ParsingResult.result will be set to undefined, ParsingResult.message will contain an error message.
 */
export const parse = (value: string): ParsingResult => {
  if (!value) {
    return {
      result: undefined,
      message: 'Personal number value cannot be empty.'
    };
  }

  const { firstPart, secondPart } = splitPersonalNumberValue(value);
  if (firstPart.length !== 6) {
    return {
      result: undefined,
      message: `First part of personal number must have 6 digits. Input value: ${value}. First part: ${firstPart}.`
    };
  } else if (secondPart.length !== 3 && secondPart.length !== 4) {
    return {
      result: undefined,
      message: `Second part of personal number must have 3 or 4 digits. Input value: ${value}. Second part: ${secondPart}.`
    };
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
      return {
        result: undefined,
        message: `Given personal number does not satisfy modulo condition. Input value: ${value}.`
      };
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

  // Remove improbableMonthAddition if there is one
  if (month > improbableMonthAddition) {
    if (year >= personalNumberAddingTwentyIssueYear) {
      month -= improbableMonthAddition;
    } else {
      return {
        result: undefined,
        message: `Value of the month "${month}" has improbable month addition of ${improbableMonthAddition}, but value of the year "${year}" is earlier than ${personalNumberAddingTwentyIssueYear}.`
      };
    }
  }

  // Get day
  const day = Number(firstPart.substr(4, 2));

  // Get date of birth
  const dateOfBirth = getDateOfBirth(year, month, day);
  if (!dateOfBirth) {
    return {
      result: undefined,
      message: `Not a valid date of birth. Values: year = ${year}, month = ${month} and day = ${day}.`
    };
  }

  // Get birth order
  const birthOrder = Number(secondPart.substr(0, 3));

  // Get age
  const age = getAge(dateOfBirth);

  return {
    result: {
      age,
      dateOfBirth,
      gender,
      birthOrder,
      controlDigit
    },
    message: 'Personal number is valid.'
  };
};
