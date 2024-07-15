'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@frontend/common/ui';
import { ProgressBar } from '@frontend/common/ui/progress-bar';
import { CloseIcon, RocketIcon_v2 } from '@frontend/common/icons';

import EndSessionPrompt from '../end-session-prompt';
import { useUserDetailsData } from '@frontend/domain/user-profile/hooks';
import { UserPlanStatusEnum } from '@frontend/domain/user-profile/enums/user-plan-enum';

type HeaderProps = {
  progress: number;
};

/**
 * Header Component
 *
 * A header with a close or back button and a progress bar.
 */
export const ProgressHeader = ({ progress }: HeaderProps) => {
  const [showEndSessionPrompt, setShowEndSessionPrompt] = useState(false);
  const userDetails = useUserDetailsData();
  useEffect(() => {
    window.history.pushState(null, '', window.location.pathname);

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      setShowEndSessionPrompt(true);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-10 mx-auto flex h-[60px] w-full flex-row items-center bg-white px-5 md:h-[100px] md:max-w-6xl md:px-12">
      <div className="row flex flex-grow items-center gap-[50px]">
        <div className="row flex flex-grow items-center gap-4">
          {/* Prompt to ask user if they really want to quit the quiz */}
          <EndSessionPrompt
            open={showEndSessionPrompt}
            setOpen={setShowEndSessionPrompt}
            goto={'/account/quiz'}
          >
            <CloseIcon height={15} width={15} className="text-[#afafaf]" />
          </EndSessionPrompt>
          <ProgressBar value={progress} />
        </div>

        {userDetails &&
          userDetails.userPlanTypeId != UserPlanStatusEnum.Paid && (
            <Link href="/pricing" className="max-md:hidden">
              <Button
                variant="primary"
                size="small"
                textSize="small"
                endIcon={<RocketIcon_v2 />}
                paddingSize="small"
              >
                Go Premium
              </Button>
            </Link>
          )}
      </div>
    </header>
  );
};
