import React from 'react';
import { ElephantChilling } from '@frontend/common/icons/ElephantChilling';
import { Flex } from '@radix-ui/themes';
import { Checkbox, CheckboxIndicator } from '@radix-ui/react-checkbox';
import { SketchLogoIcon } from '@radix-ui/react-icons';
import { CheckIcon } from '@radix-ui/react-icons';
import { Button } from '@frontend/common/ui';
import { FreePromptProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';
import { updateUserSubscription } from '@frontend/domain/cancellation-flow/hooks';

// This component is used to display the free prompt screen
export const PauseSubscriptionStartingScreen = (props: FreePromptProps) => {
  const { onNext, selections, selectionsString, username } = props;
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
    <div className="flex h-full w-full flex-row flex-wrap items-center justify-center px-4 md:flex-nowrap md:px-40">
      <div className="flex flex-col py-24">
        <span className="mb-6 text-5xl font-semibold text-custom-black">
          Hey {username}, we have{' '}
          <span className="text-custom-blue">paused your subscription </span>
          for the summer.
        </span>
        <span className="mb-6 text-lg font-normal text-custom-black">
          You can have <span className="text-custom-blue">FREE ACCESS</span> to
          SimpleStudy premium until October. You will not be billed, and can
          cancel anytime.
        </span>
      </div>
      <div className="mt-4 md:mx-14" />
      <ElephantChilling />
    </div>
  );
};
