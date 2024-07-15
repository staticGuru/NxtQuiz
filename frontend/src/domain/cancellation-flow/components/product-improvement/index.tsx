import React from 'react';
import { ContentProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { LoadingSpinner, OptionSelector } from '@frontend/common/ui';
import { handleOptionSelection } from '@frontend/domain/cancellation-flow/utils';
import { useFetchProductImprovements } from '@frontend/domain/product-improvement/hooks';

// This component is used to display the product improvement screen
export const ProductImprovement = (props: ContentProps) => {
  const {
    selectedOption,
    selectedOptionString,
    setSelectedOption,
    setSelectedOptionString,
    handleWritingState,
  } = props;

  const { data: productImprovements, isLoading } =
    useFetchProductImprovements();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 py-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {productImprovements.map((option) => (
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
