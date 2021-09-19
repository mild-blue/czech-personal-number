import { parse } from './parser';
import { ValidationResult } from './model/ValidationResult.interface';

/**
 * Personal number validator
 *
 * @param value - The personal number with or without a slash symbol.
 * @returns true if value is a valid personal number, error message if value is not a valid personal number.
 */
export const validate = (value: string): ValidationResult => {
  const parserResult = parse(value);

  if (parserResult.result) {
    return {
      isValid: true,
      detail: parserResult.result
    };
  }

  return {
    isValid: false,
    detail: parserResult.message
  };
};
