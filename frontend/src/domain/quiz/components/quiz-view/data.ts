import { Question } from '../../../../common/components/quiz/types';
export const McqQuestions: Question[] = [
  {
    question: 'What is the capital of France?',
    answers: ['London', 'Paris', 'Berlin', 'Rome'],
    correctAnswer: 1,
    correctAnswerDetail: 'The capital of France is Paris',
    difficulty: 'easy',
  },
  {
    question: 'What is the capital of Germany?',
    answers: ['Berlin', 'London', 'Paris', 'Rome'],
    correctAnswer: 0,
    correctAnswerDetail: 'The capital of Germany is Berlin',
    difficulty: 'regular',
  },
  {
    question: 'What is the capital of Italy?',
    answers: ['London', 'Paris', 'Berlin', 'Rome'],
    correctAnswer: 3,
    correctAnswerDetail: 'The capital of Italy is Rome',
    difficulty: 'hard',
  },
  {
    question: 'What is the capital of Spain?',
    answers: ['Madrid', 'London', 'Paris', 'Berlin'],
    correctAnswer: 0,
    correctAnswerDetail: 'The capital of Spain is Madrid',
    difficulty: 'difficult',
  },
];
