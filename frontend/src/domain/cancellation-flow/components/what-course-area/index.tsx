import React from 'react';
import { ContentProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { LoadingSpinner, OptionSelector } from '@frontend/common/ui';
import { handleOptionSelection } from '@frontend/domain/cancellation-flow/utils';
import { useFetchUniversityCourseAreas } from '@frontend/domain/university-course-area/hooks';

// This component is used to display the what course area screen
export const WhatCourseArea = (props: ContentProps) => {
  const {
    selectedOption,
    selectedOptionString,
    setSelectedOption,
    setSelectedOptionString,
    handleWritingState,
  } = props;
  const { data: universityCourseAreas, isLoading } =
    useFetchUniversityCourseAreas();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 py-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {universityCourseAreas?.map((universityCourseArea) => (
          <OptionSelector
            key={Number(universityCourseArea.id)}
            text={universityCourseArea.name}
            icon={universityCourseArea.icon}
            isSelected={selectedOption === Number(universityCourseArea.id)}
            onClick={() =>
              handleOptionSelection(
                Number(universityCourseArea.id),
                universityCourseArea.name,
                setSelectedOption,
                setSelectedOptionString,
                handleWritingState,
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
