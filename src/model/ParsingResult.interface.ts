import { ParsedPersonalNumber } from './ParsedPersonalNumber.interface';

export interface ParsingResult {
  result: ParsedPersonalNumber | undefined;
  message: string;
}
