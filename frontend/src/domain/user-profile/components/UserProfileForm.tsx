import React, { useEffect, useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFetchCountries } from '@frontend/domain/user-profile/hooks';
import { useFetchExams, useFetchExamYears } from '@frontend/domain/exam/hooks';
import { findOptionByValue } from '@frontend/domain/user-profile/utils';
import { formSchema } from './zodFormValidationSchema';
import { SelectAsyncOption } from '@frontend/common/types/form-types';
import { ApiService } from '@frontend/lib/apiService';
import { useMutation } from '@tanstack/react-query';
import {
  Button,
  Typography,
  FormRow,
  Input,
  FormInputController,
  Box,
} from '@frontend/common/ui';
import { useToast } from '@frontend/common/ui/toast';
import { SelectAsyncSelect } from '@frontend/common/ui/form/SelectAsync';
import { LoadingSpinner } from '@frontend/common/ui';

export const UserProfileForm: React.FC = () => {
  type FormData = z.infer<typeof formSchema>;
  const emptyOptionValue: SelectAsyncOption = { label: '', value: '' };

  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [defaultCountryOption, setDefaultCountryOption] =
    useState<SelectAsyncOption | null>(null);
  const [defaultExamOption, setDefaultExamOption] =
    useState<SelectAsyncOption | null>(null);
  const [defaultExamYearOption, setDefaultExamYearOption] =
    useState<SelectAsyncOption | null>(null);

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const selectedCountry = watch('country');
  const selectedExam = watch('exam');
  const { showToast } = useToast();

  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await ApiService.get('/user-profile');
      setValue('name', data.name);
      setValue('email', data.email);

      const countryOption = {
        label: data.countryName,
        value: data.countryCode,
      };
      const examOption = {
        label: data.examName,
        value: data.examId?.toString() ?? '',
      };
      const examYearOption = {
        label: data.examYear?.toString() ?? '',
        value: data.examYear?.toString() ?? '',
      };

      setDefaultCountryOption(countryOption);
      setDefaultExamOption(examOption);
      setDefaultExamYearOption(examYearOption);

      setValue('country', countryOption);
      setValue('exam', examOption);
      setValue('examYear', examYearOption);

      setIsProfileLoading(false);
    } catch (error) {
      console.error('Failed to fetch user profile', error);
    }
  }, [setValue]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const { data: countryOptions, isLoading: loadingCountries } =
    useFetchCountries();
  const {
    data: examOptions,
    isLoading: loadingExams,
    refetch: refetchExams,
  } = useFetchExams(selectedCountry?.value);
  const {
    data: examYearOptions,
    isLoading: loadingExamYears,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refetch: refetchExamYears,
  } = useFetchExamYears(selectedExam?.value, true);

  useEffect(() => {
    if (countryOptions && defaultCountryOption) {
      const countryOption = findOptionByValue(
        countryOptions,
        defaultCountryOption.value,
      );
      setValue('country', countryOption || { label: '', value: '' });
    }
  }, [countryOptions, defaultCountryOption, setValue]);

  useEffect(() => {
    if (examOptions && defaultExamOption) {
      const examOption = findOptionByValue(
        examOptions,
        defaultExamOption.value,
      );
      setValue('exam', examOption || { label: '', value: '' });
    }
  }, [examOptions, defaultExamOption, setValue]);

  useEffect(() => {
    if (examYearOptions && defaultExamYearOption) {
      const examYearOption = findOptionByValue(
        examYearOptions,
        defaultExamYearOption.value,
      );
      setValue('examYear', examYearOption || { label: '', value: '' });
    }
  }, [examYearOptions, defaultExamYearOption, setValue]);

  const handleCountryChange = (value: SelectAsyncOption | null) => {
    if (value && value.value === selectedCountry?.value) return;

    setValue('country', value || emptyOptionValue);
    setValue('exam', emptyOptionValue);
    setValue('examYear', emptyOptionValue);
    setDefaultExamOption(null);
    setDefaultExamYearOption(null);
    refetchExams();
  };

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return ApiService.put('/user-profile', {
        name: data.name,
        email: data.email,
        countryCode: data.country.value,
        examId: parseInt(data.exam.value),
        examYear: parseInt(data.examYear.value),
      });
    },
    onSuccess: () => {
      showToast('Form submitted successfully!', 'success');
      /*
       * Reload the page to get the updated user profile data
       * This is needed to update the list of subjects in the subjects modal list
       * TODO: Remove it  Once the subjects modal is updated to use the react
       */
      window.parent.postMessage(
        { action: 'page-reload' },
        process.env.NEXT_PUBLIC_POST_LOGIN_AREA_URL || 'http://localhost',
      );
    },
    onError: (error) => {
      showToast(`Error: ${error.message}`, 'error');
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) =>
    mutation.mutate(data);

  if (isProfileLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Box xs={12} className="py-5">
      <Box xs={12} className="border-b-[1px] border-border-lightGray pb-5">
        <Typography variant="h3" className="text-secondary-blue">
          Personal info
        </Typography>
        <Typography variant="p" className="mt-1 text-secondary-blue">
          Update your personal details here.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FormRow label="Name">
          <FormInputController name="name" control={control}>
            <Input
              id="name"
              placeholder="Enter your name"
              error={errors.name?.message}
            />
          </FormInputController>
        </FormRow>
        <FormRow label="Email">
          <FormInputController name="email" control={control}>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              error={errors.name?.message}
            />
          </FormInputController>
        </FormRow>
        <FormRow label="Country">
          <SelectAsyncSelect
            name="country"
            control={control}
            options={countryOptions}
            defaultValue={defaultCountryOption}
            isLoading={loadingCountries}
            onChange={handleCountryChange}
            error={errors.country?.value?.message}
          />
        </FormRow>
        <FormRow label="Exam">
          <SelectAsyncSelect
            name="exam"
            control={control}
            options={examOptions}
            isDisabled={!selectedCountry}
            defaultValue={defaultExamOption}
            isLoading={loadingExams}
            error={errors.exam?.value?.message}
          />
        </FormRow>
        <FormRow label="Exam Year">
          <SelectAsyncSelect
            name="examYear"
            control={control}
            options={examYearOptions}
            isDisabled={!selectedExam}
            defaultValue={defaultExamYearOption}
            isLoading={loadingExamYears}
            error={errors.examYear?.value?.message}
          />
        </FormRow>
        <Box xs={12} className="mt-5 justify-end">
          <Button>Update</Button>
        </Box>
      </form>
    </Box>
  );
};
