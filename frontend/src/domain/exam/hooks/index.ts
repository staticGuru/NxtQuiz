import { useQuery } from '@tanstack/react-query';
import {
  mapExamData,
  mapExamYearData,
  mapExamYearsData,
  mapExamYearsDataForSelect,
} from '@frontend/domain/exam/mappers';
import { ApiService } from '@frontend/lib/apiService';

// This hook is used to fetch the exams
export const useFetchExams = (countryCode) => {
  return useQuery({
    queryKey: ['exams', countryCode],
    queryFn: async () => {
      const data = await ApiService.get(`/exam?countryCode=${countryCode}`);
      return mapExamData(data);
    },
    enabled: !!countryCode,
  });
};

// This hook is used to fetch the exam years
export const useFetchExamYears = (examId: any, isSelect?: boolean) => {
  return useQuery({
    queryKey: ['examYears', examId],
    queryFn: async () => {
      const data = await ApiService.get(`/exam-year?examId=${examId}`);
      return isSelect
        ? mapExamYearsDataForSelect(data)
        : mapExamYearsData(data);
    },
    enabled: !!examId,
  });
};

// This hook is used to fetch the exam year
export const useFetchExamYear = (examYearId) => {
  return useQuery({
    queryKey: ['examYear', examYearId],
    queryFn: async () => {
      const data = await ApiService.get(`/exam-year/${examYearId}`);
      return mapExamYearData(data);
    },
    enabled: !!examYearId,
  });
};

// This hook is used to fetch the exam year
export const updateUserExamYear = async (userId, data) => {
  await ApiService.put(`/user-profile/exam-year?userId=${userId}`, data);
};
