import React from 'react';

import { IconProps } from '@frontend/common/types/icon-types';

export const PasswordIcon: React.FC<IconProps> = ({ className, ariaLabel }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      className={className}
      aria-label={'Password Label' || ariaLabel}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.34 8.734a.5.5 0 00.5-.5V7a.5.5 0 00-.5-.5H6.546a1.73 1.73 0 00-1.652-1.234c-.956 0-1.734.778-1.734 1.734 0 .957.778 1.735 1.734 1.735A1.73 1.73 0 006.546 7.5h1.408v.735a.5.5 0 001 0V7.5h.886v.735a.5.5 0 00.5.5zM4.11.333h5.78c2.258 0 3.776 1.585 3.776 3.944v5.445c0 2.36-1.518 3.944-3.777 3.944H4.11c-2.259 0-3.777-1.585-3.777-3.944V4.277C.333 1.918 1.851.333 4.11.333zM4.16 7a.736.736 0 011.468 0A.735.735 0 014.16 7z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
