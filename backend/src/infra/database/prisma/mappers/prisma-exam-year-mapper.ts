import { exam_year as PrismaExamYear, Prisma } from '@prisma/client';
import { ExamYear } from '@backend/domain/exam/entities/exam-year-entity';

export class PrismaExamYearMapper {
  static toDomain(raw: PrismaExamYear): ExamYear {
    return ExamYear.create({
      examYearId: raw.exam_year_id,
      examYearTitle: raw.exam_year_title,
      examId: raw.exam_id,
      isBeforeUniversity: raw.is_before_university,
      examYearIcon: raw.exam_year_icon ?? '',
      examStartDate: raw.exam_start_date ?? new Date(),
      examEndDate: raw.exam_end_date ?? new Date(),
    });
  }

  static toPrisma(examYear: ExamYear): Prisma.exam_yearUncheckedCreateInput {
    return {
      exam_year_title: examYear.examYearTitle,
      exam_id: examYear.examId,
      is_before_university: examYear.isBeforeUniversity,
      exam_year_icon: examYear.examYearIcon,
      exam_start_date: examYear.examStartDate,
      exam_end_date: examYear.examEndDate,
    };
  }
}
