import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { QuizProgressRepository } from '@backend/domain/quiz/repositories/quiz-progress-repository';
import { QuizProgress } from '@backend/domain/quiz/entities/quiz-entity';

@Injectable()
export class PrismaQuizProgressRepository implements QuizProgressRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: QuizProgress): Promise<QuizProgress> {
    return this.prisma.quiz_progress.create({ data });
  }
}
