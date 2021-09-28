import { getAge } from '../utils';
import { ParsedPersonalNumber } from '../model/ParsedPersonalNumber.interface';
import { Gender } from '../model/Gender.enum';
import { parse } from '../parser';

test('A female born on 18.05.2000', () => {
  const gender = Gender.F;
  const dateOfBirth = new Date(2000, 4, 18);
  const firstPart = '005518';
  const birthOrder = 53;
  const controlDigit = 2;

  const expectedResult: ParsedPersonalNumber = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit
  };

  const secondPart = `0${birthOrder}${controlDigit}`;
  expect(parse(`${firstPart}${secondPart}`)).toHaveProperty('result', expectedResult);
  expect(parse(`${firstPart}/${secondPart}`)).toHaveProperty('result', expectedResult);
  expect(parse(`${firstPart}/${birthOrder}`)).toHaveProperty('message', `Second part of personal number must have 3 or 4 digits. Input value: ${firstPart}/${birthOrder}. Second part: ${birthOrder}.`);
});

test('A female born on 18.05.1900', () => {
  const gender = Gender.F;
  const dateOfBirth = new Date(1900, 4, 18);
  const firstPart = '005518';
  const birthOrder = 53;
  const controlDigit = undefined;

  const expectedResult: ParsedPersonalNumber = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit
  };

  expect(parse(`${firstPart}/0${birthOrder}`)).toHaveProperty('result', expectedResult);
});

test('A female born on 18.05.1900', () => {
  const gender = Gender.F;
  const dateOfBirth = new Date(1900, 4, 18);
  const firstPart = '005518';
  const birthOrder = 532;
  const controlDigit = undefined;

  const expectedResult: ParsedPersonalNumber = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit
  };

  expect(parse(`${firstPart}/${birthOrder}`)).toHaveProperty('result', expectedResult);
});

test('A female born on 01.01.1953 with incorrect addition of 20', () => {
  const gender = Gender.F;
  const dateOfBirth = new Date(1953, 0, 1);
  const firstPart = '537101';
  const birthOrder = 1;
  const controlDigit = undefined;

  const expectedResult: ParsedPersonalNumber = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit
  };

  expect(parse(`${firstPart}/00${birthOrder}`)).toHaveProperty('message', 'Value of the month "21" has improbable month addition of 20, but value of the year "1953" is earlier than 2004.');
});

test('A male born on 21.01.2014 with correct addition of 20', () => {
  const gender = Gender.M;
  const dateOfBirth = new Date(2014, 0, 21);
  const firstPart = '142121';
  const birthOrder = 1;
  const controlDigit = 0;

  const expectedResult: ParsedPersonalNumber = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit
  };

  expect(parse(`${firstPart}/00${birthOrder}${controlDigit}`)).toHaveProperty('result', expectedResult);
});

test('A male born on 04.10.1939', () => {
  const gender = Gender.M;
  const dateOfBirth = new Date(1939, 9, 4);
  const firstPart = '391004';
  const birthOrder = 179;

  const expectedResult: ParsedPersonalNumber = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit: undefined
  };

  expect(parse(`${firstPart}${birthOrder}`)).toHaveProperty('result', expectedResult);
  expect(parse(`${firstPart}/${birthOrder}`)).toHaveProperty('result', expectedResult);
  expect(parse(`${firstPart}/${birthOrder}8`)).toEqual({ result: undefined, message: `Given personal number does not satisfy modulo condition. Input value: ${firstPart}/${birthOrder}8.` });
});

test('A male born on 9.9.1872', () => {
  const gender = Gender.M;
  const dateOfBirth = new Date(1872, 8, 9);
  const firstPart = '720909';
  const birthOrder = 728;

  const expectedResult: ParsedPersonalNumber = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit: undefined
  };

  expect(parse(`${firstPart}${birthOrder}`)).toHaveProperty('result', expectedResult);
  expect(parse(`${firstPart}/${birthOrder}`)).toHaveProperty('result', expectedResult);
});

test('A male born on 10.1.2021', () => {
  const gender = Gender.M;
  const dateOfBirth = new Date(2021, 0, 10);
  const firstPart = '210110';
  const birthOrder = 609;
  const controlDigit = 5;

  const expectedResult: ParsedPersonalNumber = {
    age: getAge(dateOfBirth),
    gender,
    birthOrder,
    dateOfBirth,
    controlDigit
  };

  expect(parse(`${firstPart}${birthOrder}${controlDigit}`)).toHaveProperty('result', expectedResult);
  expect(parse(`${firstPart}/${birthOrder}${controlDigit}`)).toHaveProperty('result', expectedResult);
});

test('A male born on 10.1.2053', () => {
  expect(parse(`530110/0013`)).toHaveProperty('message', 'Not a valid date of birth. Values: year = 2053, month = 1 and day = 10.');
});
