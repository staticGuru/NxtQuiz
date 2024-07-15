import React from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
  ACCOUNT_ROUTE,
  SignUpParams,
  routesData,
  routesList,
} from '@frontend/domain/signup-flow/routes';
import { cn } from '@frontend/lib/cn';
import { Button } from '@frontend/common/ui';
import { SignUpContext } from '@frontend/domain/signup-flow/state';

/**
 * Footer Component
 *
 * A footer with single button:
 * Clicking on the button will take the user to the next screen in the flow.
 */
export const Footer = React.forwardRef<
  HTMLElement,
  { footerContentIntersecting: boolean }
>(({ footerContentIntersecting }, ref) => {
  const { selectedOptions } = React.useContext(SignUpContext);

  const router = useRouter();
  const { route } = useParams<SignUpParams>();

  const isButtonDisabled =
    selectedOptions[route] === '' ||
    (Array.isArray(selectedOptions[route]) &&
      selectedOptions[route].length === 0);

  const onButtonClick = () => {
    if (isButtonDisabled) {
      return;
    }

    const nextRoute = routesList[routesList.indexOf(route) + 1];
    router.push(nextRoute);
  };

  if (route === ACCOUNT_ROUTE) {
    return null;
  }

  return (
    <footer
      ref={ref}
      className={cn(
        'fixed bottom-0 left-0 right-0 flex h-[90px] flex-row items-center justify-center bg-white px-4 md:h-[168px]',
        footerContentIntersecting && 'border-t border-gray-200',
      )}
    >
      <Button
        variant={isButtonDisabled ? 'subtle' : 'primary'}
        size="medium"
        disabled={isButtonDisabled}
        className="w-full md:w-[500px]"
        onClick={onButtonClick}
      >
        {routesData[route].footerButtonText}
      </Button>
    </footer>
  );
});

Footer.displayName = 'Footer';
