import React from 'react';
import { LeftArrowBold } from '@frontend/common/icons';
import { Button } from '@frontend/common/ui';
import Link from 'next/link';
import { getPostLoginAreaUrl } from '@frontend/domain/cancellation-flow/utils';
import { FooterProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { updateUserSubscription } from '@frontend/domain/cancellation-flow/hooks';

// This component is used to display the footer for the screen
export const Footer = (props: FooterProps) => {
  const { isContinueButtonDisabled, onContinue, selections, selectionsString } =
    props;

  const handleCancelPlan = async () => {
    if (selections) {
      updateUserSubscription({
        cancellationData: selections,
        cancellationDataString: selectionsString,
        cancellationStatus: 'Completed',
        isCancelling: true,
      });
    }

    onContinue && onContinue();
  };

  return (
    <div className="show-after-500 mb-4 flex flex-row flex-wrap items-center justify-center gap-[30px] pb-4 max-md:mb-0 max-md:gap-[20px] max-md:py-4">
      <Link href={getPostLoginAreaUrl()}>
        <Button
          variant="primary"
          size="medium"
          startIcon={<LeftArrowBold />}
          className="mt-2 min-w-[307px] max-md:mt-0 max-md:min-w-[100%] max-md:max-w-[100%]"
        >
          Back to study
        </Button>
      </Link>
      <Button
        variant={isContinueButtonDisabled ? 'subtle' : 'highlighted'}
        size="medium"
        disabled={isContinueButtonDisabled}
        className="mt-2 min-w-[307px] max-md:mt-0 max-md:min-w-[100%] max-md:max-w-[100%]"
        onClick={handleCancelPlan}
      >
        Continue
      </Button>
    </div>
  );
};
