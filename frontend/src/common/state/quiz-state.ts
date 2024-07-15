import { atom } from 'jotai';

export interface QuizStateProps {
  streakCounter: number;
  score: number;
}

export const quizState = atom<QuizStateProps | null>(null);
