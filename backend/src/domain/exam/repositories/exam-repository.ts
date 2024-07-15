import { Exam } from '@backend/domain/exam/entities/exam-entity';

export abstract class ExamRepository {
  abstract list(countryCode?: string): Promise<Exam[]>;
}
