import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from '../repositories/quiz-repository';
import { QuizProgressRepository } from '../repositories/quiz-progress-repository';

@Injectable()
export class SubmitQuizUseCase {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly quizProgressRepository: QuizProgressRepository,
  ) {}

  async execute(
    quizId: number,
    userId: number,
    progress: string,
  ): Promise<number> {
    const quiz = await this.quizRepository.findById(quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const progressObj = progress ? JSON.parse(progress) : {};
    const correctQuestionsIds = progressObj?.correctAnswers || [];
    const wrongQuestionsIds = progressObj?.wrongAnswers || [];

    const questionIds = quiz.questionIds ? quiz.questionIds.split(',') : [];
    const score = Math.ceil(
      (correctQuestionsIds.length / questionIds.length) * 100,
    );
    await this.quizProgressRepository.create({
      user_id: userId,
      asset_id: quizId,
      topic_id: quiz.topic_id,
      total_questions: questionIds.length,
      correct_questions: correctQuestionsIds.length,
      correct_questions_ids: correctQuestionsIds.join(','),
      wrong_questions_ids: wrongQuestionsIds.join(','),
    });

    return score;
  }
}
