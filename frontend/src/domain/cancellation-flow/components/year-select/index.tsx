import React from 'react';
import { ContentProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { OptionSelector } from '@frontend/common/ui';
import { handleOptionSelection } from '@frontend/domain/cancellation-flow/utils';
import { useFetchExamYears } from '@frontend/domain/exam/hooks';

// This component is used to display the year select screen
export const YearSelect = (props: ContentProps) => {
  const {
    selectedOption,
    selectedOptionString,
    setSelectedOption,
    setSelectedOptionString,
    handleWritingState,
    examId,
  } = props;
  const { data: examYears, isLoading, error } = useFetchExamYears(examId);

  return (
    <div className="hide-scrollbar show-after-500 flex h-full w-full flex-col items-center justify-start overflow-auto px-4 max-md:h-[calc(100vh-325px)] sm:pb-[50px] md:h-[calc(100vh-350px)] md:px-0">
      <div className="m-auto max-md:w-full">
        {examYears?.map((year) => (
          <OptionSelector
            key={Number(year.id)}
            text={year.title}
            isSelected={selectedOption === Number(year.id)}
            className="mb-4 max-md:min-w-[100%]"
            onClick={() =>
              handleOptionSelection(
                Number(year.id),
                year.title,
                setSelectedOption,
                setSelectedOptionString,
                handleWritingState,
              )
            }
            icon={year.icon}
          />
        ))}
      </div>
    </div>
  );
};
