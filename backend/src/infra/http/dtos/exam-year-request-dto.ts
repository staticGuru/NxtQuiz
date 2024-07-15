import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class ExamYearRequestDto {
  @ApiProperty({
    required: false,
    description: 'Optional exam ID to filter the exam years',
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  examId?: number;

  @ApiProperty({
    required: false,
    description: 'Optional exam year ID to filter the exam year',
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  examYearId?: number;
}
