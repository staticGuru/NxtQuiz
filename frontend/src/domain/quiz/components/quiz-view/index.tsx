'use client';

import { useRouter } from 'next/navigation';

import { Question } from '@frontend/common/components/quiz/types';
import { QuizView as QuizViewCommon } from '@frontend/common/components/quiz';

import { McqQuestions } from './data';

type QuizViewProps = {
  id: number;
};

export const QuizView = ({ id }: QuizViewProps) => {
  const router = useRouter();

  const questions: Question[] = McqQuestions;

  const onQuizCompletion = () => {
    router.push(`/account/quiz/quiz_completed?score=30`);
  };

  return (
    <QuizViewCommon
      headerType="progress"
      questions={questions}
      isLoading={false}
      error={null}
      onRetry={() => {}}
      onSubmit={onQuizCompletion}
    />
  );
};
