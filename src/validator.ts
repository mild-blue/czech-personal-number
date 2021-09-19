import { parse } from './parser';
import { ValidationResult } from './model/ValidationResult.interface';

/**
 * Personal number validator
 *
 * @param value - The personal number with or without a slash symbol.
 * @returns ValidationResult
 * If value is a valid personal number, ValidationResult.isValid will be set to true, ValidationResult.detail will contain parsing result.
 * If value is not a valid personal number, ValidationResult.isValid will be set to false, ValidationResult.detail will contain an error message.
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
