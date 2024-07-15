'use client';

import React, { useRef } from 'react';
import { notFound, useParams } from 'next/navigation';

import { Header } from './Header';
import { Footer } from './Footer';

import {
  ACCOUNT_ROUTE,
  SignUpParams,
  routesData,
  routesList,
} from '@frontend/domain/signup-flow/routes';
import { cn } from '@frontend/lib/cn';
import { SignUpProvider } from '@frontend/domain/signup-flow/components';
import { useRiveAnimation } from '@frontend/common/components/rive-animation';
import { ElephantSpeechBubble } from '@frontend/domain/signup-flow/components';
import useElementsIntersecting from '@frontend/common/hooks/useElementsIntersecting';

export const SignUpLayout = ({ children }) => {
  const { route } = useParams<SignUpParams>();
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const headerContentIntersecting = useElementsIntersecting(
    headerRef,
    contentRef,
  );

  const footerContentIntersecting = useElementsIntersecting(
    footerRef,
    contentRef,
  );

  // In case the route is not in our list of signup routes, we should redirect to 404
  if (routesList.indexOf(route) === -1) {
    notFound();
  }

  // Get the Animated Rive component
  const { RiveComponent, handleWritingState } = useRiveAnimation({
    src: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/backend/uploads/animations/elephant`,
    stateMachines: 'State Machine 1',
  });

  return (
    <SignUpProvider handleWritingState={handleWritingState}>
      <div className="relative flex h-screen flex-col bg-white">
        <div
          ref={headerRef}
          className={cn(
            'fixed left-0 right-0 top-0 z-10 bg-white px-4',
            headerContentIntersecting && 'border-b border-gray-200',
          )}
        >
          <Header />
          <ElephantSpeechBubble
            message={routesData[route].chatBubbleMessages}
            riveComponent={RiveComponent}
          />
        </div>

        <div
          className={cn(
            'flex flex-1 flex-col items-center pt-[189px] md:pt-[238px]',
            route !== ACCOUNT_ROUTE && 'pb-[94px] md:pb-[170px]',
          )}
        >
          <div ref={contentRef} className="h-full w-full overflow-x-hidden">
            {children}
          </div>
        </div>

        <Footer
          ref={footerRef}
          footerContentIntersecting={footerContentIntersecting}
        />
      </div>
    </SignUpProvider>
  );
};
