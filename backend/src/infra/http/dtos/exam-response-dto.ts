import { Exam } from '@backend/domain/exam/entities/exam-entity';
import { ApiProperty } from '@nestjs/swagger';

export class ExamResponseDto {
  @ApiProperty()
  examId: number;

  @ApiProperty()
  examName: string;

  @ApiProperty()
  examDescription: string;

  @ApiProperty({ required: false })
  createdBy?: number;

  @ApiProperty()
  createdOn: Date;

  @ApiProperty({ required: false })
  updatedBy?: number;

  @ApiProperty()
  updatedOn: Date;

  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  examSlug: string;

  public static toDto(exam: Exam): ExamResponseDto {
    return {
      examId: exam.examId,
      examName: exam.examName,
      examDescription: exam.examDescription,
      createdBy: exam.createdBy,
      createdOn: exam.createdOn,
      updatedBy: exam.updatedBy,
      updatedOn: exam.updatedOn,
      countryCode: exam.countryCode,
      status: exam.status,
      examSlug: exam.examSlug,
    };
  }
}
