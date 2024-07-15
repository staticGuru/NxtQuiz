import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SubjectRepository } from '@backend/domain/subject/repositories/subject-repository';
import { Subject } from '@backend/domain/subject/entities/subject-entity';
import { PrismaSubjectMapper } from '@backend/infra/database/prisma/mappers/prisma-subject-mapper';

@Injectable()
export class PrismaSubjectRepository implements SubjectRepository {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<Subject[]> {
    const subjects = await this.prisma.subject.findMany();
    return subjects.map(PrismaSubjectMapper.toDomain);
  }

  async getSubjectsByExamId(examId: number): Promise<Subject[]> {
    const subjects = await this.prisma.subject.findMany({
      where: { exam_id: examId },
    });
    return subjects.map(PrismaSubjectMapper.toDomain);
  }

  async getById(subjectId: number): Promise<Subject | null> {
    const subject = await this.prisma.subject.findUnique({
      where: { subject_id: subjectId },
    });

    if (!subject) {
      return null;
    }

    return PrismaSubjectMapper.toDomain(subject);
  }
}
