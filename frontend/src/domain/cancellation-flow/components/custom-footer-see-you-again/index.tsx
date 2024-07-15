import React from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@frontend/common/ui';
import Link from 'next/link';
import { getPostLoginAreaUrl } from '@frontend/domain/cancellation-flow/utils';
import { ScreenProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';

// This component is used to display the custom footer for the see you again screen
export const CustomFooterSeeYouAgain = (props: ScreenProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-row flex-wrap items-center justify-center">
        <Link href={getPostLoginAreaUrl()}>
          <Button
            variant="primary"
            size="large"
            endIcon={<ArrowRightIcon />}
            className="mt-2"
          >
            Continue to Student Space
          </Button>
        </Link>
      </div>
    </div>
  );
};
