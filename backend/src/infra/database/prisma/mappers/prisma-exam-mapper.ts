import { exam as PrismaExam, Prisma } from '@prisma/client';
import { Exam } from '@backend/domain/exam/entities/exam-entity';

export class PrismaExamMapper {
  static toDomain(raw: PrismaExam): Exam {
    return Exam.create({
      examId: raw.exam_id,
      examName: raw.exam_name,
      examDescription: raw.exam_description,
      createdBy: raw.created_by ?? undefined,
      createdOn: raw.created_on,
      updatedBy: raw.updated_by ?? undefined,
      updatedOn: raw.updated_on,
      countryCode: raw.country_code,
      status: raw.status,
      examSlug: raw.exam_slug,
      startDate: raw.start_date,
      endDate: raw.end_date,
    });
  }

  static toPrisma(exam: Exam): Prisma.examUncheckedCreateInput {
    return {
      exam_name: exam.examName,
      exam_description: exam.examDescription,
      created_by: exam.createdBy ?? null,
      created_on: exam.createdOn,
      updated_by: exam.updatedBy ?? null,
      updated_on: exam.updatedOn,
      country_code: exam.countryCode,
      status: exam.status,
      exam_slug: exam.examSlug,
      start_date: exam.startDate,
      end_date: exam.endDate,
    };
  }
}
