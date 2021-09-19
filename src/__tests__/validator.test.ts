import { validate } from '../validator';

test('Valid personal number with a slash', () => {
  expect(validate('720909/7280')).toHaveProperty('isValid', true);
});

test('Valid personal number of person born in 1872', () => {
  expect(validate('720909/728')).toHaveProperty('isValid', true);
});

test('Valid personal number without a slash', () => {
  expect(validate('7209097280')).toHaveProperty('isValid', true);
});

test('Invalid personal numbers with invalid length', () => {
  expect(validate('')).toHaveProperty('detail', 'Personal number value cannot be empty.');
  expect(validate('72090/7280')).toHaveProperty('detail', 'First part of personal number must have 6 digits. Given first part: 72090.');
  expect(validate('72090978')).toHaveProperty('detail', 'Second part of personal number must have 3 or 4 digits. Given second part: 78.');
});

test('Invalid personal numbers with invalid second part', () => {
  expect(validate('721909/1349')).toHaveProperty('detail', 'Second part does not satisfy modulo condition. Given second part: 1349.');
  expect(validate('720939/1349')).toHaveProperty('detail', 'Second part does not satisfy modulo condition. Given second part: 1349.');
  expect(validate('720909/7180')).toHaveProperty('detail', 'Second part does not satisfy modulo condition. Given second part: 7180.');
});

test('Valid personal number in the future', () => {
  expect(validate('530110/0013')).toHaveProperty('detail', 'No valid date of birth can be created with values: year = 2053, month = 1 and day = 10.');
});
