import { Gender } from './Gender.enum';

export interface ParsedPersonalNumber {
  age: number;
  dateOfBirth: Date;
  gender: Gender;
  birthOrder: number;
  controlDigit: number | undefined;
}
