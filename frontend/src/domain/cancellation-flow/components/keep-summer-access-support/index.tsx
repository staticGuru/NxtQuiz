import React from 'react';
import { ElephantUsingLaptop } from '@frontend/common/icons/ElephantUsingLaptop';
import { KeepSummerAccessSupportProps } from '../../interfaces/component-props';

// This component is used to display the keep summer access support screen
export const KeepSummerAccessSupport = (
  props: KeepSummerAccessSupportProps,
) => {
  const { username } = props;

  return (
    <div className="flex h-full w-full flex-row flex-wrap items-center justify-center px-4 md:flex-nowrap md:px-40">
      <ElephantUsingLaptop />
      <div className="mt-4 md:mx-14" />
      <div className="flex flex-col py-24">
        <span className="mb-6 text-lg font-normal text-custom-black">
          Hey {username}, thank you for supporting SimpleStudy
        </span>
      </div>
    </div>
  );
};
