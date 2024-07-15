import { IsInt } from 'class-validator';

export class UpdateUserExamYearDto {
  @IsInt()
  examYear: number;
}
