import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ExamYearRepository } from '@backend/domain/exam/repositories/exam-year-repository';
import { ExamYear } from '@backend/domain/exam/entities/exam-year-entity';
import { PrismaExamYearMapper } from '@backend/infra/database/prisma/mappers/prisma-exam-year-mapper';

@Injectable()
export class PrismaExamYearRepository implements ExamYearRepository {
  constructor(private prisma: PrismaService) {}

  async list(examId?: number): Promise<ExamYear[]> {
    const examYears = await this.prisma.exam_year.findMany({
      where: examId ? { exam_id: examId } : {},
    });

    return examYears.map(PrismaExamYearMapper.toDomain);
  }

  async findById(examYearId: number): Promise<ExamYear | null> {
    const examYear = await this.prisma.exam_year.findUnique({
      where: { exam_year_id: examYearId },
    });
    return examYear ? PrismaExamYearMapper.toDomain(examYear) : null;
  }
}
