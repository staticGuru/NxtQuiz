import { Quiz } from '../entities/quiz-entity';

export abstract class QuizRepository {
  abstract findById(id: number): Promise<Quiz | null>;
}
