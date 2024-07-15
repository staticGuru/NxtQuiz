import React from 'react';
import { IconProps } from '@frontend/common/types/icon-types';

export const CheckWithCircleIcon: React.FC<IconProps> = ({
  className,
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="10" cy="9.99973" rx="10" ry="9.9802" fill="currentColor" />
      <path
        d="M6 9.99995L9 12.994L14 8.00391"
        stroke="#E7F3E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
