import { QuizProgress } from '../entities/quiz-entity';

export abstract class QuizProgressRepository {
  abstract create(data: Partial<QuizProgress>): Promise<QuizProgress>;
}
