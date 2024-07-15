import { useQuery } from '@tanstack/react-query';
import { mapProductImprovementData } from '@frontend/domain/product-improvement/utils';
import { ApiService } from '@frontend/lib/apiService';

// This hook is used to fetch the product improvements
export const useFetchProductImprovements = () => {
  return useQuery({
    queryKey: ['product-improvements'],
    queryFn: async () => {
      const data = await ApiService.get(`/product-improvement`);
      return mapProductImprovementData(data);
    },
  });
};
