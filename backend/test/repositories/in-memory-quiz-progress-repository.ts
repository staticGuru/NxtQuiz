import { QuizProgress } from '@backend/domain/quiz/entities/quiz-entity';
import { QuizProgressRepository } from '@backend/domain/quiz/repositories/quiz-progress-repository';

export class InMemoryQuizProgressRepository implements QuizProgressRepository {
  private quizProgresses: QuizProgress[] = [];

  async create(progress: QuizProgress): Promise<any> {
    this.quizProgresses.push(progress);
  }
}
