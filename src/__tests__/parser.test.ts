import { Gender, parse, PersonalNumberParseResult } from '../parser';
import { getAge } from '../utils';

test('A female born on 18.05.2000', () => {
  const gender = Gender.F;
  const dateOfBirth = new Date(2000, 4, 18);
  const firstPart = '005518';
  const birthOrder = 53;
  const controlDigit = 2;

  const expectedResult: PersonalNumberParseResult = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit
  };

  expect(parse(`${firstPart}0${birthOrder}${controlDigit}`)).toEqual(expectedResult);
  expect(parse(`${firstPart}/0${birthOrder}${controlDigit}`)).toEqual(expectedResult);
  expect(parse(`${firstPart}/${birthOrder}`)).toEqual(undefined);
});

test('A female born on 18.05.1900', () => {
  const gender = Gender.F;
  const dateOfBirth = new Date(1900, 4, 18);
  const firstPart = '005518';
  const birthOrder = 532;
  const controlDigit = undefined;

  const expectedResult: PersonalNumberParseResult = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit
  };

  expect(parse(`${firstPart}/${birthOrder}`)).toEqual(expectedResult);
});

test('A male born on 04.10.1939', () => {
  const gender = Gender.M;
  const dateOfBirth = new Date(1939, 9, 4);
  const firstPart = '391004';
  const birthOrder = 179;

  const expectedResult: PersonalNumberParseResult = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit: undefined
  };

  expect(parse(`${firstPart}${birthOrder}`)).toEqual(expectedResult);
  expect(parse(`${firstPart}/${birthOrder}`)).toEqual(expectedResult);
});

test('A male born on 9.9.1872', () => {
  const gender = Gender.M;
  const dateOfBirth = new Date(1872, 8, 9);
  const firstPart = '720909';
  const birthOrder = 728;

  const expectedResult: PersonalNumberParseResult = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit: undefined
  };

  expect(parse(`${firstPart}${birthOrder}`)).toEqual(expectedResult);
  expect(parse(`${firstPart}/${birthOrder}`)).toEqual(expectedResult);
});
