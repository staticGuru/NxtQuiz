import React from 'react';
import { ContentProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { LoadingSpinner, OptionSelector } from '@frontend/common/ui';
import { handleOptionSelection } from '@frontend/domain/cancellation-flow/utils';
import { useFetchEducationLevels } from '@frontend/domain/education-level/hooks';

// This component is used to display the next steps for the user
export const NextSteps = (props: ContentProps) => {
  const {
    selectedOption,
    setSelectedOption,
    selectedOptionString,
    setSelectedOptionString,
    handleWritingState,
  } = props;
  const { data: educationLevels, isLoading } = useFetchEducationLevels();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 py-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {educationLevels?.map((educationLevel) => (
          <OptionSelector
            key={Number(educationLevel.id)}
            text={educationLevel.name}
            icon={educationLevel.icon}
            isSelected={selectedOption === Number(educationLevel.id)}
            onClick={() =>
              handleOptionSelection(
                Number(educationLevel.id),
                educationLevel.name,
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
