import { ExamRepository } from '@backend/domain/exam/repositories/exam-repository';
import { Exam } from '@backend/domain/exam/entities/exam-entity';

export class InMemoryExamRepository implements ExamRepository {
  private exams: Exam[] = [];

  async list(countryCode?: string): Promise<Exam[]> {
    if (countryCode) {
      return this.exams.filter((exam) => exam.countryCode === countryCode);
    }
    return this.exams;
  }

  async create(exam: Exam): Promise<void> {
    this.exams.push(exam);
  }
}
