import React from 'react';
import { IconProps } from '@frontend/common/types/icon-types';

export const CrossWithCircleIcon: React.FC<IconProps> = ({
  className,
  width = 18,
  height = 18,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="9" fill="currentColor" />
      <path
        d="M5.3999 12.6004L12.5999 5.40039"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.3999 5.39961L12.5999 12.5996"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
