import { Quiz } from '@backend/domain/quiz/entities/quiz-entity';
import { QuizRepository } from '@backend/domain/quiz/repositories/quiz-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuizRepository implements QuizRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<Quiz | null> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { quiz_id: id },
      include: {
        notes: true,
      },
    });
    if (!quiz) {
      return null;
    }
    const questionIds = quiz.questionIds?.split(',').map(Number);

    // Fetch questions
    const questions = await this.prisma.quizquestions.findMany({
      where: {
        quizQuestionsId: {
          in: questionIds,
        },
      },
    });

    return new Quiz(
      quiz.quiz_id,
      quiz.title,
      quiz.user_id,
      quiz.subject_id,
      quiz.topic_id,
      quiz.examId,
      quiz.questionIds,
      quiz.duration,
      quiz.quiz_mode,
      quiz.quiz_type,
      quiz.question_type,
      quiz.code,
      quiz.created_on,
      quiz.source_note_id,
      quiz.sub_topic_id,
      questions,
    );
  }
}
