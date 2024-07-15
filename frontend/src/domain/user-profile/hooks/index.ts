import { useQuery } from '@tanstack/react-query';
import { mapCountryData } from '@frontend/domain/user-profile/utils';
import { ApiService } from '@frontend/lib/apiService';
import { useUserDetailsData } from '@frontend/domain/user-profile/hooks/useUserDetailsData';
const useFetchCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const data = await ApiService.get('/country');
      return mapCountryData(data);
    },
  });
};

const useFetchUserDetails = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      return await ApiService.get('/user-profile');
    },
  });
};

export { useFetchCountries, useFetchUserDetails, useUserDetailsData };
