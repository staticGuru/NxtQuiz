import { Question } from '@frontend/common/components/quiz/types';

export const mapQuizQuestions = (quiz): Question[] => {
  const questions = quiz.questions;
  if (!questions.length) return [];

  return questions.map((item) => {
    const options = item.options.split(',');
    return {
      id: item.quizQuestionsId,
      question: item.question,
      answers: options,
      correctAnswer: parseInt(item.answer),
      correctAnswerDetail: item.answerComment,
      difficulty: 'regular', // TODO: need to check with questionType
    };
  });
};
