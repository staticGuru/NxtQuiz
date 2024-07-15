import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ExamRequestDto {
  @ApiProperty({
    required: false,
    description: 'Optional country code to filter the exams',
  })
  @IsOptional()
  @IsString()
  countryCode?: string;
}
