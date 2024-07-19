import { Question, Quiz } from '../entities/quiz-entity';

export abstract class QuizRepository {
  abstract findById(id: number): Promise<Quiz | null>;
}

export abstract class QuestionRepository {
  abstract findByQuizId(quizId: number): Promise<Question[]>;
}
