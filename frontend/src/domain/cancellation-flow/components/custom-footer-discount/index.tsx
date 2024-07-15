import React from 'react';

import { ArrowLeftIcon, SketchLogoIcon } from '@radix-ui/react-icons';
import { Button } from '@frontend/common/ui';
import Link from 'next/link';
import { getPostLoginAreaUrl } from '@frontend/domain/cancellation-flow/utils';
import { ScreenProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { updateUserSubscription } from '@frontend/domain/cancellation-flow/hooks';

// This component is used to display the custom footer for the discount screen
export const CustomFooterDiscount = (props: ScreenProps) => {
  const {
    onNext,
    selections,
    selectionsString,
    isContinueButtonDisabled,
    onNoThanks,
  } = props;

  const applyDiscount = () => {
    updateUserSubscription({
      couponName: process.env.NEXT_PUBLIC_FIFTYOFF_COUPON_NAME,
      cancellationData: selections,
      cancellationDataString: selectionsString,
      cancellationStatus: 'Discount',
      isCancelling: false,
    });
    onNext();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-row flex-wrap items-center justify-center">
        <Link href={getPostLoginAreaUrl()}>
          <Button
            variant="primary"
            size="large"
            startIcon={<ArrowLeftIcon />}
            className="mt-2"
          >
            Back to study
          </Button>
        </Link>

        <Button
          variant="primary"
          size="large"
          disabled={isContinueButtonDisabled}
          className="mx-3 mt-2"
          onClick={applyDiscount}
          startIcon={<SketchLogoIcon />}
        >
          Give me 50% off premium
        </Button>
      </div>
      <button
        onClick={onNoThanks}
        className="font-bold text-neutral-200 underline"
      >
        No thanks, I&lsquo;d rather not
      </button>
    </div>
  );
};
