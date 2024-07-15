'use client';
import React, { useEffect } from 'react';

import {
  CancellationFlowOptionsWrapper,
  CancellationFlowPromptWrapper,
  CustomFooterDiscount,
  CustomFooterFree,
  CustomFooterPauseSubscription,
  DiscountPrompt,
  FreePrompt,
  PauseSubscriptionStartingScreen,
  OptionsStep,
  ScreenBase,
  WhatCourseArea,
  Rating,
  ProductImprovement,
  YearSelect,
  NextSteps,
  CustomFooterFreeAccess,
  FreeAccess,
  SVGBundle,
} from '..';
import { LoadingSpinner } from '@frontend/common/ui';
import { useFetchUserDetails } from '@frontend/domain/user-profile/hooks';
import {
  updateUserExamYear,
  useFetchExamYear,
} from '@frontend/domain/exam/hooks';
import { CancellationReason } from '@frontend/domain/cancellation-flow/components/cancellation-reason';
import { CustomFooterSeeYouAgain } from '@frontend/domain/cancellation-flow/components/custom-footer-see-you-again';
import { SeeYouAgainPrompt } from '@frontend/domain/cancellation-flow/components/see-you-again-prompt';
import { KeepSummerAccess } from '@frontend/domain/cancellation-flow/components/keep-summer-access';
import { CustomFooterKeepSummerAccess } from '@frontend/domain/cancellation-flow/components/custom-footer-keep-summer-access';
import { KeepSummerAccessSupport } from '@frontend/domain/cancellation-flow/components/keep-summer-access-support';
import {
  UserSelections,
  UserSelectionsString,
} from '@frontend/domain/cancellation-flow/interfaces/component-props';
import {
  SCREEN_TRANSITIONS,
  NO_THANKS_SCREEN_TRANSITIONS,
  PAUSE_SUBSCRIPTION_SCREEN_INDEX,
  YEAR_SELECT_SCREEN_INDEX,
  NEXT_STEPS_SCREEN_INDEX,
  CANCELLATION_REASON_SCREEN_INDEX,
  FREE_PROMPT_SCREEN_INDEX,
} from '@frontend/domain/cancellation-flow/screen-transitions';

// This component is used to display the main page of the cancellation flow
export const CancellationFlow = () => {
  const [currentScreen, setCurrentScreen] = React.useState<number>(
    PAUSE_SUBSCRIPTION_SCREEN_INDEX,
  );
  const [userProfile, setUserProfile] = React.useState<any>({});
  const [examYear, setExamYear] = React.useState<any>(null);
  const [selections, setSelections] = React.useState<UserSelections>({});
  const [selectionsString, setSelectionsString] =
    React.useState<UserSelectionsString>({});

  const { data: userData, isLoading: isLoadingUserData } =
    useFetchUserDetails();
  const { data: examYearData, refetch: refetchExamYear } = useFetchExamYear(
    userProfile.examYear,
  );

  useEffect(() => {
    if (userData) {
      setUserProfile(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (examYearData) {
      setExamYear(examYearData);
    }
  }, [examYearData]);

  // This effect will refetch exam year data when userProfile.examYear changes
  useEffect(() => {
    if (userProfile.examYear) {
      refetchExamYear();
    }
  }, [userProfile.examYear, refetchExamYear]);

  // This function is used to handle the next button click
  const handleNext = () => {
    const nextScreenIndex = SCREEN_TRANSITIONS[currentScreen]
      ? SCREEN_TRANSITIONS[currentScreen](selections)
      : currentScreen + 1;
    setCurrentScreen(nextScreenIndex);
  };

  // This function is used to handle the no thanks button click
  const handleNoThanks = () => {
    // Check if examYearData is null and navigate to the year selection screen
    if (!examYearData) {
      setCurrentScreen(YEAR_SELECT_SCREEN_INDEX);
      return;
    }

    if (
      currentScreen === PAUSE_SUBSCRIPTION_SCREEN_INDEX &&
      examYearData &&
      userProfile
    ) {
      const currentDate = new Date();
      const examStartDate = new Date(examYearData.examStartDate);
      if (!userProfile.examYear) {
        setCurrentScreen(YEAR_SELECT_SCREEN_INDEX); // Show year select screen if user has not selected a year
      } else if (
        currentDate >= examStartDate &&
        currentDate <= examYearData.examEndDate
      ) {
        if (examYearData.isBeforeUniversity) {
          setCurrentScreen(NEXT_STEPS_SCREEN_INDEX); // Show next steps screen if the exam has already started
        } else {
          setCurrentScreen(FREE_PROMPT_SCREEN_INDEX);
        }
      } else {
        setCurrentScreen(CANCELLATION_REASON_SCREEN_INDEX); // Show cancellation reason screen if the exam has not started
      }
    } else {
      const noThanksScreenIndex = NO_THANKS_SCREEN_TRANSITIONS[currentScreen]
        ? NO_THANKS_SCREEN_TRANSITIONS[currentScreen](selections, true)
        : currentScreen + 1;
      setCurrentScreen(noThanksScreenIndex);
    }
  };

  // This function is used to handle the year select
  const handleYearSelect = async (year: number) => {
    try {
      await updateUserExamYear(userProfile.userId, { examYear: Number(year) });

      // Update userProfile state
      const updatedUserProfile = {
        ...userProfile,
        examYear: year,
      };
      setUserProfile(updatedUserProfile);

      // Refetch exam year data after updating the user profile
      const { data: newExamYearData } = await refetchExamYear();

      console.log('newExamYearData:', newExamYearData); // Add logging for debugging

      if (newExamYearData) {
        setExamYear(newExamYearData);
        const currentDate = new Date();
        const examStartDate = new Date(newExamYearData.examStartDate);
        if (!updatedUserProfile.examYear) {
          setCurrentScreen(YEAR_SELECT_SCREEN_INDEX); // Show year select screen if user has not selected a year
        } else if (
          currentDate >= examStartDate &&
          currentDate <= newExamYearData.examEndDate
        ) {
          if (newExamYearData.isBeforeUniversity) {
            setCurrentScreen(NEXT_STEPS_SCREEN_INDEX); // Show next steps screen if the exam has already started
          } else {
            setCurrentScreen(FREE_PROMPT_SCREEN_INDEX);
          }
        } else {
          setCurrentScreen(CANCELLATION_REASON_SCREEN_INDEX); // Show cancellation reason screen if the exam has not started
        }
      } else {
        handleNext();
      }
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  };

  if (isLoadingUserData) return <LoadingSpinner />;

  const screens = [
    <CancellationFlowOptionsWrapper
      key="CancellationFlowOptionsWrapper"
      onNext={() => handleYearSelect(examYear!)}
      selectedOption={examYear || 0}
      selectedOptionString=""
      isNextEnabled={!!examYear}
    >
      <OptionsStep
        message="What year are you in?"
        ContentComponent={YearSelect}
        examId={userProfile.examId}
        selectedOption={examYear || 0}
        setSelectedOption={setExamYear}
      />
    </CancellationFlowOptionsWrapper>,

    <CancellationFlowOptionsWrapper
      key="NextSteps"
      onNext={handleNext}
      selectedOption={selections.educationLevelId || 0}
      selectedOptionString={selectionsString.educationLevel || ''}
      isNextEnabled={!!selections.educationLevelId}
    >
      <OptionsStep
        message="What are you planning on doing next?"
        ContentComponent={NextSteps}
        selectedOption={selections.educationLevelId || 0}
        selectedOptionString={selectionsString.educationLevel || ''}
        setSelectedOption={(value) => {
          setSelections((prev) => ({ ...prev, educationLevelId: value }));
        }}
        setSelectedOptionString={(value) => {
          setSelectionsString((prev) => ({
            ...prev,
            educationLevel: value.toString(),
          }));
        }}
      />
    </CancellationFlowOptionsWrapper>,

    <CancellationFlowOptionsWrapper
      key="CancellationReason"
      onNext={handleNext}
      selectedOption={selections.cancellationReasonId || 0}
      selectedOptionString={selectionsString.cancellationReason || ''}
      isNextEnabled={!!selections.cancellationReasonId}
    >
      <OptionsStep
        message="Why do you want to cancel?"
        ContentComponent={CancellationReason}
        selectedOption={selections.cancellationReasonId || 0}
        selectedOptionString={selectionsString.cancellationReason || ''}
        setSelectedOption={(value) => {
          setSelections((prev) => ({ ...prev, cancellationReasonId: value }));
        }}
        setSelectedOptionString={(value) => {
          setSelectionsString((prev) => ({
            ...prev,
            cancellationReason: value.toString(),
          }));
        }}
      />
    </CancellationFlowOptionsWrapper>,

    <CancellationFlowOptionsWrapper
      key="WhatCourseArea"
      onNext={handleNext}
      selectedOption={selections.universityCourseAreaId || 0}
      selectedOptionString={selectionsString.universityCourseArea || ''}
      isNextEnabled={!!selections.universityCourseAreaId}
    >
      <OptionsStep
        message="Nice, what area are you planning on studying?"
        ContentComponent={WhatCourseArea}
        selectedOption={selections.universityCourseAreaId || 0}
        selectedOptionString={selectionsString.universityCourseArea || ''}
        setSelectedOption={(value) => {
          setSelections((prev) => ({ ...prev, universityCourseAreaId: value }));
        }}
        setSelectedOptionString={(value) => {
          setSelectionsString((prev) => ({
            ...prev,
            universityCourseArea: value.toString(),
          }));
        }}
      />
    </CancellationFlowOptionsWrapper>,

    <CancellationFlowOptionsWrapper
      key="Rating"
      onNext={handleNext}
      selectedOption={selections.productRatingId || 0}
      selectedOptionString={selectionsString.productRating || ''}
      isNextEnabled={!!selections.productRatingId}
    >
      <OptionsStep
        message="How would you rate the product?"
        ContentComponent={Rating}
        selectedOption={selections.productRatingId || 0}
        selectedOptionString={selectionsString.productRating || ''}
        setSelectedOption={(value) => {
          setSelections((prev) => ({ ...prev, productRatingId: value }));
        }}
        setSelectedOptionString={(value) => {
          setSelectionsString((prev) => ({
            ...prev,
            productRating: value.toString(),
          }));
        }}
      />
    </CancellationFlowOptionsWrapper>,

    <CancellationFlowOptionsWrapper
      key="ProductImprovement"
      onNext={handleNext}
      selectedOption={selections.productImprovementId || 0}
      selectedOptionString={selectionsString.productImprovement || ''}
      isNextEnabled={!!selections.productImprovementId}
      selections={selections}
      selectionsString={selectionsString}
    >
      <OptionsStep
        message="How could we improve for other students?"
        ContentComponent={ProductImprovement}
        selectedOption={selections.productImprovementId || 0}
        selectedOptionString={selectionsString.productImprovement || ''}
        setSelectedOption={(value) => {
          setSelections((prev) => ({ ...prev, productImprovementId: value }));
        }}
        setSelectedOptionString={(value) => {
          setSelectionsString((prev) => ({
            ...prev,
            productImprovement: value.toString(),
          }));
        }}
      />
    </CancellationFlowOptionsWrapper>,

    <CancellationFlowPromptWrapper key="FreePrompt">
      <ScreenBase
        headerEndAddornment={true}
        customFooter={
          <CustomFooterFree
            onNext={handleNext}
            onNoThanks={handleNoThanks}
            selections={selections}
            selectionsString={selectionsString}
          />
        }
      >
        <FreePrompt
          key="FreePrompt"
          onNext={handleNext}
          selections={selections}
          selectionsString={selectionsString}
          username={userProfile.name}
        />
      </ScreenBase>
    </CancellationFlowPromptWrapper>,

    <CancellationFlowPromptWrapper key="DiscountPrompt">
      <ScreenBase
        headerEndAddornment={true}
        customFooter={
          <CustomFooterDiscount
            onNext={handleNext}
            selections={selections}
            onNoThanks={handleNoThanks}
            selectionsString={selectionsString}
          />
        }
      >
        <DiscountPrompt
          key="DiscountPrompt"
          onNext={handleNext}
          selections={selections}
          selectionsString={selectionsString}
          username={userProfile.name}
        />
      </ScreenBase>
    </CancellationFlowPromptWrapper>,

    <CancellationFlowPromptWrapper key="FreeAccess">
      <ScreenBase
        headerEndAddornment={false}
        customFooter={
          <CustomFooterFreeAccess
            onNext={handleNext}
            onNoThanks={handleNoThanks}
            selections={selections}
            selectionsString={selectionsString}
          />
        }
        style={{
          background: 'linear-gradient(to bottom left, #0F5EF7, #20285E)',
        }}
      >
        <SVGBundle />
        <FreeAccess key="FreeAccess" />
      </ScreenBase>
    </CancellationFlowPromptWrapper>,

    <CancellationFlowPromptWrapper key="SeeYouAgainPrompt">
      <ScreenBase
        headerEndAddornment={true}
        customFooter={<CustomFooterSeeYouAgain onNext={handleNext} />}
      >
        <SeeYouAgainPrompt key="SeeYouAgainPrompt" />
      </ScreenBase>
    </CancellationFlowPromptWrapper>,

    <CancellationFlowPromptWrapper key="KeepSummerAccess">
      <ScreenBase
        headerEndAddornment={true}
        customFooter={<CustomFooterKeepSummerAccess onNext={handleNext} />}
      >
        <KeepSummerAccess key="KeepSummerAccess" username={userProfile.name} />
      </ScreenBase>
    </CancellationFlowPromptWrapper>,

    <CancellationFlowPromptWrapper key="KeepSummerAccessSupport">
      <ScreenBase
        headerEndAddornment={true}
        customFooter={<CustomFooterSeeYouAgain onNext={handleNext} />}
      >
        <KeepSummerAccessSupport
          key="KeepSummerAccessSupport"
          username={userProfile.name}
        />
      </ScreenBase>
    </CancellationFlowPromptWrapper>,

    <CancellationFlowPromptWrapper key="PauseSubscription">
      <ScreenBase
        headerEndAddornment={true}
        customFooter={
          <CustomFooterPauseSubscription
            onNext={handleNext}
            onNoThanks={handleNoThanks}
            selections={selections}
            selectionsString={selectionsString}
          />
        }
      >
        <PauseSubscriptionStartingScreen
          key="PauseSubscription"
          onNext={handleNext}
          selections={selections}
          selectionsString={selectionsString}
          username={userProfile.name}
        />
      </ScreenBase>
    </CancellationFlowPromptWrapper>,
  ];

  const validScreens = screens.filter(Boolean);

  return validScreens[currentScreen];
};
