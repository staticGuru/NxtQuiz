import React from 'react';
import { SketchLogoIcon } from '@radix-ui/react-icons';
import { Button } from '@frontend/common/ui';
import { ScreenProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { updateUserSubscription } from '@frontend/domain/cancellation-flow/hooks';

// This component is used to display the custom footer for the free access screen
export const CustomFooterFreeAccess = (props: ScreenProps) => {
  const { onNext, onNoThanks, selections, selectionsString } = props;

  const applyDiscount = () => {
    updateUserSubscription({
      couponName: process.env.NEXT_PUBLIC_SUMMERFREE_COUPON_NAME,
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
          className="hidden md:block"
          style={{ margin: '15px' }}
          onClick={applyDiscount}
        >
          Join early access program
        </Button>
        <Button style={{ margin: '15px' }} onClick={applyDiscount}>
          <SketchLogoIcon style={{ marginRight: '12px' }} />
          Get FREE ACCESS until October
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
