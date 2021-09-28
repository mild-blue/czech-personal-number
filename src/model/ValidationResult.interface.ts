import { ParsedPersonalNumber } from './ParsedPersonalNumber.interface';

export interface ValidationResult {
  isValid: boolean;
  detail: ParsedPersonalNumber | string;
}
