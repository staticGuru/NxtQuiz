import React from 'react';
import { ArrowLeftIcon, SketchLogoIcon } from '@radix-ui/react-icons';
import { Button } from '@frontend/common/ui';
import Link from 'next/link';
import { getPostLoginAreaUrl } from '@frontend/domain/cancellation-flow/utils';
import { ScreenProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { updateUserSubscription } from '@frontend/domain/cancellation-flow/hooks';

// This component is used to display the custom footer for the free screen
export const CustomFooterPauseSubscription = (props: ScreenProps) => {
  const { onNext, onNoThanks, selections, selectionsString } = props;
  const { isContinueButtonDisabled } = props;

  const applyDiscount = () => {
    updateUserSubscription({
      couponName: process.env.NEXT_PUBLIC_FIFTYOFF_COUPON_NAME,
      cancellationData: selections,
      cancellationDataString: selectionsString,
      cancellationStatus: 'Paused',
      isCancelling: false,
    });
    onNext();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-row flex-wrap items-center justify-center">
        <Button
          variant="primary"
          size="large"
          disabled={isContinueButtonDisabled}
          className="mx-3 mt-2"
          onClick={applyDiscount}
          startIcon={<SketchLogoIcon />}
        >
          Keep SimpleStudy for FREE
        </Button>
      </div>
      <button
        className="font-bold text-neutral-200 underline"
        onClick={onNoThanks}
      >
        No thanks, I&lsquo;d rather not
      </button>
    </div>
  );
};
