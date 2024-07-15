import React from 'react';
import { ElephantChilling } from '@frontend/common/icons/ElephantChilling';
import { KeepSummerAccessProps } from '../../interfaces/component-props';

// This component is used to display the keep summer access screen
export const KeepSummerAccess = (props: KeepSummerAccessProps) => {
  const { username } = props;
  return (
    <div className="flex h-full w-full flex-row flex-wrap items-center justify-center px-4 md:flex-nowrap md:px-40">
      <div className="flex flex-col py-24">
        <span className="mb-6 text-5xl font-semibold text-custom-black">
          Hey {username}, it’s time to relax and
          <span className="text-custom-blue"> enjoy your summer.</span>
        </span>
        <span className="mb-6 text-lg font-normal text-custom-black">
          We will update your access to our university product shortly, and let
          you know once you go back to school. See you soon.
        </span>
      </div>
      <div className="mt-4 md:mx-14" />
      <ElephantChilling />
    </div>
  );
};
