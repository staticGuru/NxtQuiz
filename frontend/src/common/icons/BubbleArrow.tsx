import React from 'react';
import { IconProps } from '@frontend/common/types/icon-types';

export const BubbleArrow: React.FC<IconProps> = ({
  className,
  ariaLabel,
  width = 20,
  height = 31,
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
      <g clipPath="url(#clip0_264_546)">
        <g mask="url(#mask0_264_546)">
          <path
            d="M25.8061 8.68561C27.0959 7.53912 29.1349 8.45473 29.1349 10.1804V27.4999C29.1349 28.6045 28.2394 29.4999 27.1349 29.4999H7.6505C5.81147 29.4999 4.94726 27.2269 6.32178 26.0051L25.8061 8.68561Z"
            fill="white"
            stroke="#E5E5E5"
            strokeWidth="2"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_264_546">
          <rect width="20" height="31" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
