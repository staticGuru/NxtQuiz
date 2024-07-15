import { useQuery } from '@tanstack/react-query';
import { mapEducationLevelData } from '@frontend/domain/education-level/utils';
import { ApiService } from '@frontend/lib/apiService';

// This hook is used to fetch the education levels
export const useFetchEducationLevels = () => {
  return useQuery({
    queryKey: ['education-levels'],
    queryFn: async () => {
      const data = await ApiService.get(`/education-level`);
      return mapEducationLevelData(data);
    },
  });
};
