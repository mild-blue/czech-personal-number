import { Gender } from './Gender.enum';

export interface PersonalNumberParseResult {
  age: number;
  dateOfBirth: Date;
  gender: Gender;
  birthOrder: number;
  controlDigit: number | undefined;
}
