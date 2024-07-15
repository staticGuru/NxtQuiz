import React from 'react';
import { IconProps } from '@frontend/common/types/icon-types';

export const LeftArrowBold: React.FC<IconProps> = ({
  className,
  ariaLabel,
  width = 14,
  height = 14,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 17 17`}
      fill="none"
      className={className}
      role="img"
      aria-label={ariaLabel || 'Mail Icon'}
    >
      <path
        d="M1.5 8.5L7.39474 1.5"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 8.5L7.39474 15.5"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 8.5H15.5"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
