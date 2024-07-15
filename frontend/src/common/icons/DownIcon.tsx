import React from 'react';
import { IconProps } from '@frontend/common/types/icon-types';

export const DownIcon: React.FC<IconProps> = ({
  className,
  ariaLabel,
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      role="img"
      aria-label={ariaLabel || 'Mail Icon'}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#667085"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
