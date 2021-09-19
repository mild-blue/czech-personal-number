import { parse } from './parser';

/**
 * Personal number validator
 *
 * @param value - The personal number with or without a slash symbol.
 * @returns true if value is a valid personal number, error message if value is not a valid personal number.
 */
export const validate = (value: string): true | string => {
  try {
    parse(value);
    return true;
  } catch (e) {
    return e.message;
  }
};
