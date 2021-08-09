import { validate } from '../validator';

test('Valid personal numbers with a slash', () => {
  expect(validate('720909/7280')).toBe(true);
});

test('Valid personal numbers of person born in 1872', () => {
  expect(validate('720909/728')).toBe(true);
});

test('Valid personal numbers without a slash', () => {
  expect(validate('7209097280')).toBe(true);
});

test('Invalid personal numbers with invalid length', () => {
  expect(validate('')).toBe(false);
  expect(validate('72090/7280')).toBe(false);
  expect(validate('72090978')).toBe(false);
});

test('Invalid personal numbers with invalid date of birth', () => {
  expect(validate('721909/1349')).toBe(false);
  expect(validate('720939/1349')).toBe(false);
});

test('Invalid personal numbers with non-zero reminder', () => {
  expect(validate('720909/7180')).toBe(false);
});
