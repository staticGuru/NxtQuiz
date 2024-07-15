import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserProfileDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsInt()
  examId: number;

  @IsInt()
  examYear: number;

  @IsNotEmpty()
  @Length(2)
  @IsString()
  countryCode: string;
}
