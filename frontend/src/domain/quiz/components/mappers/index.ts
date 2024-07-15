import { Question } from '@frontend/common/components/quiz/types';

export const mapQuizDataToQuestion = (question: any): Question => ({
  question: question.question,
  answers: question.options.split(','),
  correctAnswer: parseInt(question.answer, 10) - 1, // convert to zero-based index
  correctAnswerDetail: question.answerComment,
  difficulty: 'regular',
});
