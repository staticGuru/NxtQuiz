import { Quiz } from '@backend/domain/quiz/entities/quiz-entity';
import { QuizRepository } from '@backend/domain/quiz/repositories/quiz-repository';

export class InMemoryQuizRepository implements QuizRepository {
  private quizzes: Quiz[] = [];

  async findById(quizId: number): Promise<Quiz | null> {
    return this.quizzes.find((quiz) => quiz.quiz_id === quizId) || null;
  }

  async create(quiz: Quiz): Promise<void> {
    this.quizzes.push(quiz);
  }
}
