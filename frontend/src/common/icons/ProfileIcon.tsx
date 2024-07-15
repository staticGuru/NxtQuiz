import React from 'react';

import { IconProps } from '@frontend/common/types/icon-types';

export const ProfileIcon: React.FC<IconProps> = ({ className, ariaLabel }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="13"
      fill="none"
      viewBox="0 0 11 13"
      className={className}
      aria-label={'User Icon' || ariaLabel}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9 3.5C9 5.442 7.443 7 5.5 7A3.488 3.488 0 012 3.5C2 1.557 3.558 0 5.5 0 7.443 0 9 1.557 9 3.5zM5.5 13C2.518 13 0 12.587 0 10.993 0 9.398 2.534 9 5.5 9c2.983 0 5.5.413 5.5 2.007C11 12.602 8.466 13 5.5 13z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
