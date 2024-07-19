'use client';

import { ResultsPage } from './results-page';
type QuizResultProps = {
  score: number;
  streakCounter: number;
};

export const QuizResult = ({ score }: QuizResultProps) => {
  return (
    <>
      <ResultsPage score={score ?? 0} />
    </>
  );
};
