'use client';

import { ScreenBase } from '@frontend/domain/cancellation-flow/components/screen-base';
import React from 'react';
import { CancellationFlowOptionsWrapperProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';

// This component is a wrapper for the cancellation flow options screen
export const CancellationFlowOptionsWrapper = ({
  children,
  onNext,
  isNextEnabled,
  selections,
  selectionsString,
}: CancellationFlowOptionsWrapperProps) => {
  return (
    <ScreenBase
      onContinue={onNext}
      headerEndAddornment={true}
      isContinueButtonDisabled={!isNextEnabled}
      selections={selections}
      selectionsString={selectionsString}
    >
      <div className="relative flex flex-1 flex-col">{children}</div>
    </ScreenBase>
  );
};
