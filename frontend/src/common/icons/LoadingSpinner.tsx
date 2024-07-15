import React from 'react';
import { IconProps } from '../types/icon-types';

export const LoadingSpinner = ({ className }: IconProps) => {
  return (
    <svg
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      height="40px"
      width="40px"
      className={className}
    >
      <circle
        style={
          { '--darkreader-inline-stroke': '#33a2ff' } as React.CSSProperties
        }
        data-darkreader-inline-stroke=""
        strokeDasharray="164.93361431346415 56.97787143782138"
        r="35"
        strokeWidth="8"
        stroke="#007bff"
        fill="none"
        cy="50"
        cx="50"
      >
        <animateTransform
          keyTimes="0;1"
          values="0 50 50;360 50 50"
          dur="1s"
          repeatCount="indefinite"
          type="rotate"
          attributeName="transform"
        ></animateTransform>
      </circle>
    </svg>
  );
};
