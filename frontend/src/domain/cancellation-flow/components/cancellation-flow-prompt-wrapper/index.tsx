'use client';

import React from 'react';
import { CancellationFlowPromptWrapperProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';

// This component is used to wrap the CancellationFlowPrompt component
export const CancellationFlowPromptWrapper = ({
  children,
}: CancellationFlowPromptWrapperProps) => {
  return <>{children}</>;
};
