import { ApiService } from '@frontend/lib/apiService';
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import {
  SubmitQuizPayload,
  SubmitQuizResponse,
} from '@frontend/common/components/quiz/types';
import { mapQuizQuestions } from '../components/mappers';

export const useFetchQuizById = (quizId: number) => {
  return useQuery<any, Error>({
    queryKey: ['quiz', quizId],
    queryFn: async (): Promise<any> => {
      const data = await ApiService.get(`/quiz/${quizId}`);
      return mapQuizQuestions(data);
    },
    enabled: !!quizId,
  });
};

export const useSubmitQuizMutation = (): UseMutationResult<
  SubmitQuizResponse,
  Error,
  SubmitQuizPayload
> => {
  return useMutation<SubmitQuizResponse, Error, SubmitQuizPayload>({
    mutationFn: async (payload: SubmitQuizPayload) => {
      const response = await ApiService.post(
        `/quiz/${payload.quizId}/submit`,
        payload,
      );
      return response;
    },
  });
};
