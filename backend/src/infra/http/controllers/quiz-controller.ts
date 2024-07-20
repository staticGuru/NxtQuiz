import { GetQuizUseCase } from '@backend/domain/quiz/use-cases/get-quiz-use-cases';
import { SubmitQuizUseCase } from '@backend/domain/quiz/use-cases/submit-quiz-use-cases';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { SubmitQuizDTO } from '../dtos/submit-quiz-dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/quiz')
@ApiTags('quiz')
export class QuizController {
  constructor(
    private readonly getQuiz: GetQuizUseCase,
    private readonly submitQuiz: SubmitQuizUseCase,
  ) {}

  @Get(':id')
  async getQuizById(@Param('id') id: number) {
    const quiz = await this.getQuiz.execute(id);
    if (!quiz) {
      return { message: 'Quiz not found' };
    }
    return quiz;
  }

  @Post(':id/submit')
  async submitQuizFunction(
    @Param('id') quizId: number,
    @Body() submitQuizDTO: SubmitQuizDTO,
  ) {
    const { userId, progress } = submitQuizDTO;
    const score = await this.submitQuiz.execute(quizId, userId, progress);

    return { score };
  }
}
