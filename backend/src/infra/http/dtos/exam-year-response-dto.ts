import { ExamYear } from '@backend/domain/exam/entities/exam-year-entity';
import { ApiProperty } from '@nestjs/swagger';

export class ExamYearResponseDto {
  @ApiProperty()
  examYearId: number;

  @ApiProperty()
  examYearTitle: string;

  @ApiProperty()
  examId: number;

  @ApiProperty()
  isBeforeUniversity: boolean;

  @ApiProperty()
  examYearIcon: string;

  @ApiProperty()
  examStartDate: Date;

  @ApiProperty()
  examEndDate: Date;

  public static toDto(examYear: ExamYear): ExamYearResponseDto {
    return {
      examYearId: examYear.examYearId,
      examYearTitle: examYear.examYearTitle,
      examId: examYear.examId,
      isBeforeUniversity: examYear.isBeforeUniversity,
      examYearIcon: examYear.examYearIcon,
      examStartDate: examYear.examStartDate,
      examEndDate: examYear.examEndDate,
    };
  }
}
