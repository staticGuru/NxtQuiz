import { useQuery } from '@tanstack/react-query';
import { mapCancellationReasonData } from '@frontend/domain/cancellation-reason/utils';
import { ApiService } from '@frontend/lib/apiService';

// This hook is used to fetch the cancellation reasons
export const useFetchCancellationReasons = () => {
  return useQuery({
    queryKey: ['cancellation-reasons'],
    queryFn: async () => {
      const data = await ApiService.get(`/cancellation-reason`);
      return mapCancellationReasonData(data);
    },
  });
};
