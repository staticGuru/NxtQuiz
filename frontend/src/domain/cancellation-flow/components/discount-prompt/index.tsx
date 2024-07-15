import React from 'react';
import { ElephantUsingLaptop } from '@frontend/common/icons/ElephantUsingLaptop';
import { Flex, Checkbox } from '@radix-ui/themes';
import { SketchLogoIcon } from '@radix-ui/react-icons';
import { Button } from '@frontend/common/ui';
import { updateUserSubscription } from '@frontend/domain/cancellation-flow/hooks';
import { DiscountPromptProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';

// This component is used to display the discount prompt
export const DiscountPrompt = (props: DiscountPromptProps) => {
  const { onNext, selections, selectionsString, username } = props;
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
    <div className="flex h-full w-full flex-row flex-wrap items-center justify-center px-4 md:flex-nowrap md:px-40">
      <ElephantUsingLaptop />
      <div className="mt-4 md:mx-14" />
      <div className="flex flex-col py-24">
        <span className="mb-6 text-5xl font-semibold text-custom-black">
          Hey {username}, would you like a{' '}
          <span className="text-custom-blue">50% discount</span> on premium?
        </span>
        <span className="mb-6 text-lg font-normal text-custom-black">
          Get <span className="text-custom-blue">50% discount</span> on
          SimpleStudy premium, as well as early access to premium resources and
          student guides.
        </span>
        <Flex align="center" gap="2" className="mb-6">
          <Checkbox size={'3'} />
          <span className="text-lg font-medium text-custom-black">
            Include early access to resources and giveaways
          </span>
        </Flex>
        <Button
          size="large"
          startIcon={<SketchLogoIcon />}
          onClick={applyDiscount}
        >
          Yes, I&lsquo;d love 50% off premium
        </Button>
      </div>
    </div>
  );
};
