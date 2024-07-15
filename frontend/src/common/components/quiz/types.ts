import { ANSWER_STATES } from './data';

export type AnswerStates = (typeof ANSWER_STATES)[keyof typeof ANSWER_STATES];

export type Difficulty = 'easy' | 'regular' | 'hard' | 'difficult';

export type Question = {
  question: string;
  answers: string[];
  correctAnswer: number;
  correctAnswerDetail: string;
  difficulty: Difficulty;
};
