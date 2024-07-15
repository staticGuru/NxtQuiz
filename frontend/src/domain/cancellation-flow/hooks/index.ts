import { ApiService } from '@frontend/lib/apiService';

// This hook is used to fetch the user subscription
export const updateUserSubscription = async (data) => {
  await ApiService.put(`/cancellation-flow`, data);
};
