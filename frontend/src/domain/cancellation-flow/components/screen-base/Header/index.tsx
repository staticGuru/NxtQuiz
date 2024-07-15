import React from 'react';
import { Cross1Icon, RocketIcon } from '@radix-ui/react-icons';
import { Button } from '@frontend/common/ui';
import Link from 'next/link';
import { getPostLoginAreaUrl } from '@frontend/domain/cancellation-flow/utils';
import { HeaderProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';

// This component is used to display the header for the screen
export const Header = (props: HeaderProps) => {
  const { headerEndAddornment } = props;

  let contentToRender: React.ReactNode = null;

  if (headerEndAddornment === true) {
    contentToRender = (
      <Link href={getPostLoginAreaUrl()}>
        <Button
          variant="primary"
          size="medium"
          textSize="medium"
          endIcon={<RocketIcon />}
          paddingSize="small"
        >
          Start Studying
        </Button>
      </Link>
    );
  } else if (
    typeof headerEndAddornment === 'number' ||
    typeof headerEndAddornment === 'string' ||
    React.isValidElement(headerEndAddornment)
  ) {
    contentToRender = headerEndAddornment;
  }

  return (
    <div className="mb-8 flex flex-row items-center max-md:mb-3">
      <span className="flex-1">
        <Link href={getPostLoginAreaUrl()}>
          <button className="ml-[-10px] mt-[-2px] rounded-full p-2 text-secondary-gray transition-all duration-200 hover:bg-gray-200">
            <Cross1Icon className="h-[23px] w-[23px]" />
          </button>
        </Link>
      </span>
      {contentToRender}
    </div>
  );
};
