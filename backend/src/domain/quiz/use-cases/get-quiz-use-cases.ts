import { Injectable } from '@nestjs/common';
import { Quiz } from '../entities/quiz-entity';
import { QuizRepository } from '../repositories/quiz-repository';

@Injectable()
export class GetQuizUseCase {
  constructor(private readonly quizRepository: QuizRepository) {}

  async execute(id: number): Promise<Quiz | null> {
    const response = await this.quizRepository.findById(id);
    if (!response) {
      throw new Error('Quiz not found');
    }
    return response;
  }
}
