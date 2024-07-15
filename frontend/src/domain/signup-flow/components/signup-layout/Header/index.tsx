import React, { useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
  SignUpContext,
  initialSignUpData,
} from '@frontend/domain/signup-flow/state';
import { IconButton } from '@frontend/common/ui/icon-button';
import { ProgressBar } from '@frontend/common/ui/progress-bar';
import { ArrowLeftIcon, CloseIcon } from '@frontend/common/icons';
import { SignUpParams, routesList } from '@frontend/domain/signup-flow/routes';

/**
 * Header Component
 *
 * A header with a close or back button and a progress bar.
 */
export const Header = () => {
  const router = useRouter();
  const { route } = useParams<SignUpParams>();
  const { setSelectedOptions } = useContext(SignUpContext);

  // Calculate progressbar length in percentage
  const progress =
    ((routesList.indexOf(route) + 1) / (routesList.length + 1)) * 100;

  const onBackPress = () => {
    // Reset the selected options to the initial state when pressing back arrow icon
    setSelectedOptions((prev) => ({
      ...prev,
      [route]: initialSignUpData[route],
    }));
    router.back();
  };

  return (
    <div className="mx-auto flex h-[85px] w-full flex-row items-center md:h-[100px] md:max-w-6xl">
      <header className="row flex flex-grow items-center gap-4">
        {route === routesList[0] ? (
          <IconButton onClick={router.back}>
            <CloseIcon height={17} width={17} className="text-[#afafaf]" />
          </IconButton>
        ) : (
          <IconButton onClick={onBackPress}>
            <ArrowLeftIcon height={17} width={17} className="text-[#afafaf]" />
          </IconButton>
        )}
        <ProgressBar value={progress} />
      </header>
    </div>
  );
};
