import React from 'react';
import { ElephantUsingLaptop } from '@frontend/common/icons/ElephantUsingLaptop';
import { Button } from '@frontend/common/ui';
import Link from 'next/link';
import { getPostLoginAreaUrl } from '@frontend/domain/cancellation-flow/utils';

// This component is used to display the see you again prompt
export const SeeYouAgainPrompt = () => {
  return (
    <div className="flex h-full w-full flex-row flex-wrap items-center justify-center px-4 md:flex-nowrap md:px-40">
      <ElephantUsingLaptop />
      <div className="mt-4 md:mx-14" />
      <div className="flex flex-col py-24">
        <span className="mb-6 text-5xl font-semibold text-custom-black">
          Was it something we said? Hope to{' '}
          <span className="text-custom-blue">see you again</span> soon.
        </span>
        <span className="mb-6 text-lg font-normal text-custom-black">
          If you have any suggestions for us please let us know by contacting
          our support team below.
        </span>
        <Link href={getPostLoginAreaUrl() + '/contact'}>
          <Button size="large" variant="highlighted">
            Yes, I want to share my idea
          </Button>
        </Link>
      </div>
    </div>
  );
};
