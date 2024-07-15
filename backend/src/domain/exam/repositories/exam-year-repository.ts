import { ExamYear } from '@backend/domain/exam/entities/exam-year-entity';

export abstract class ExamYearRepository {
  abstract list(examId?: number): Promise<ExamYear[]>;
  abstract findById(examYearId?: number): Promise<ExamYear | null>;
}
