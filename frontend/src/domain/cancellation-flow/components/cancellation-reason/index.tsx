import React from 'react';
import { ContentProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { LoadingSpinner, OptionSelector } from '@frontend/common/ui';
import { handleOptionSelection } from '@frontend/domain/cancellation-flow/utils';
import { useFetchCancellationReasons } from '@frontend/domain/cancellation-reason/hooks';

// This component is used to display the cancellation reasons
export const CancellationReason = (props: ContentProps) => {
  const {
    selectedOption,
    selectedOptionString,
    setSelectedOption,
    setSelectedOptionString,
    handleWritingState,
  } = props;

  const { data: cancellationReasons, isLoading } =
    useFetchCancellationReasons();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 py-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {cancellationReasons.map((option) => (
          <OptionSelector
            key={Number(option.id)}
            text={option.name}
            icon={option.icon}
            isSelected={selectedOption === Number(option.id)}
            onClick={() =>
              handleOptionSelection(
                Number(option.id),
                option.name,
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
