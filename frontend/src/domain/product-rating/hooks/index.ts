import { useQuery } from '@tanstack/react-query';
import { mapProductRatingData } from '@frontend/domain/product-rating/utils';
import { ApiService } from '@frontend/lib/apiService';

// This hook is used to fetch the product ratings
export const useFetchProductRatings = () => {
  return useQuery({
    queryKey: ['product-ratings'],
    queryFn: async () => {
      const data = await ApiService.get(`/product-rating`);
      return mapProductRatingData(data);
    },
  });
};
