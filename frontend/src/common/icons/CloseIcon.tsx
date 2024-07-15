import React from 'react';
import { IconProps } from '@frontend/common/types/icon-types';

export const CloseIcon: React.FC<IconProps> = ({
  className,
  ariaLabel,
  width = 19,
  height = 19,
}) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
      className={className}
      role="img"
      aria-label={ariaLabel || 'Close Icon'}
    >
      <path
        d="M2 17L17 2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 1.99985L17 16.9998"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
