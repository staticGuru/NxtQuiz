'use client';

import { useRouter } from 'next/navigation';

import { Question } from '@frontend/common/components/quiz/types';
import { QuizView as QuizViewCommon } from '@frontend/common/components/quiz';

import { useFetchQuizById, useSubmitQuizMutation } from '../../hooks';

type QuizViewProps = {
  id: number;
};

export const QuizView = ({ id }: QuizViewProps) => {
  const router = useRouter();
  const { data, isLoading } = useFetchQuizById(id);
  const { mutate } = useSubmitQuizMutation();

  const onQuizCompletion = ({ quizProgress }) => {
    mutate(
      {
        progress: JSON.stringify(quizProgress),
        quizId: id,
        userId: 67373, //TODO: change it in dynamic user id setup
      },
      {
        onSuccess: ({ score }) => {
          router.push(`/account/quiz/quiz_completed?score=${score}`);
        },
        onError: (error) => {
          console.error('Error submitting quiz:', error);
        },
      },
    );
  };

  return (
    <QuizViewCommon
      headerType="progress"
      questions={data}
      isLoading={isLoading}
      error={null}
      onRetry={() => {}}
      onSubmit={onQuizCompletion}
    />
  );
};
