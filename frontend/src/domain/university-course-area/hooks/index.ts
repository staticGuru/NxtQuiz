import { useQuery } from '@tanstack/react-query';
import { mapUniversityCourseAreaData } from '@frontend/domain/university-course-area/utils';
import { ApiService } from '@frontend/lib/apiService';

// This hook is used to fetch the university course areas
export const useFetchUniversityCourseAreas = () => {
  return useQuery({
    queryKey: ['university-course-areas'],
    queryFn: async () => {
      const data = await ApiService.get(`/university-course-area`);
      return mapUniversityCourseAreaData(data);
    },
  });
};
