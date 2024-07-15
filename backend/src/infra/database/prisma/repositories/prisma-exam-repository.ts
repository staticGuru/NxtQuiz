import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ExamRepository } from '@backend/domain/exam/repositories/exam-repository';
import { Exam } from '@backend/domain/exam/entities/exam-entity';
import { PrismaExamMapper } from '@backend/infra/database/prisma/mappers/prisma-exam-mapper';

@Injectable()
export class PrismaExamRepository implements ExamRepository {
  constructor(private prisma: PrismaService) {}

  async list(countryCode?: string): Promise<Exam[]> {
    const exams = await this.prisma.exam.findMany({
      where: countryCode ? { country_code: countryCode } : {},
    });

    return exams.map(PrismaExamMapper.toDomain);
  }
}
