'use client';

import React, { useEffect } from 'react';
import { Inter, Nunito } from 'next/font/google';
import { Provider as JotaiProvider, useSetAtom } from 'jotai';

import { cn } from '@frontend/lib/cn';
import { ToastProvider } from '@frontend/common/ui/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@frontend/styles/globals.css';

const inter = Inter({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-inter',
});

const nunito = Nunito({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-nunito',
});

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  // add event listener to send height to parent window
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const sendHeight = () => {
      setTimeout(() => {
        const height = document.documentElement.scrollHeight;
        const publicUrl =
          process.env.NEXT_PUBLIC_POST_LOGIN_AREA_URL || 'http://localhost';

        const isOriginAllowed = window.location.origin
          .replace('http://', '')
          .replace('https://', '')
          .includes(publicUrl.replace('http://', '').replace('https://', ''));

        if (!isOriginAllowed) {
          return;
        }

        window.parent.postMessage({ height }, publicUrl); // Ensure the target origin is correct
      }, 300); // Delay to ensure all content is rendered
    };

    // Send height initially after the component mounts
    sendHeight();

    // Optionally, add an event listener for resizing or other updates
    window.addEventListener('resize', sendHeight);

    // Use MutationObserver to handle dynamic content changes
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Cleanup event listener and observer on component unmount
    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body
        className={cn(
          inter.className,
          inter.variable,
          nunito.variable,
          'simplestudy-react-component bg-gray-900 text-white',
        )}
      >
        <QueryClientProvider client={queryClient}>
          <JotaiProvider>
            <ToastProvider>{children}</ToastProvider>
          </JotaiProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
