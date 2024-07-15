import React from 'react';
import { ContentProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { LoadingSpinner, OptionSelector } from '@frontend/common/ui';
import { handleOptionSelection } from '@frontend/domain/cancellation-flow/utils';
import { useFetchProductRatings } from '@frontend/domain/product-rating/hooks';

// This component is used to display the rating screen
export const Rating = (props: ContentProps) => {
  const {
    selectedOption,
    selectedOptionString,
    setSelectedOption,
    setSelectedOptionString,
    handleWritingState,
  } = props;
  const { data: productRatings, isLoading } = useFetchProductRatings();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 py-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {productRatings.map((productRating) => (
          <OptionSelector
            key={Number(productRating.id)}
            text={productRating.name}
            icon={productRating.icon}
            isSelected={selectedOption === Number(productRating.id)}
            onClick={() =>
              handleOptionSelection(
                Number(productRating.id),
                productRating.name,
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
