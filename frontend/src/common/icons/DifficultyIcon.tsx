import { cn } from '@frontend/lib/cn';
import React from 'react';

type DifficultyIconProps = {
  numberOfBars: number;
};

export const DifficultyIcon = ({ numberOfBars }: DifficultyIconProps) => {
  const bars = [
    { y: 12.5586, height: 3.88235 },
    { y: 10.5586, height: 5.88235 },
    { y: 5.55859, height: 10.8824 },
    { y: 0.558594, height: 16 },
  ];

  return (
    <svg
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {bars.map((bar, index) => (
          <rect
            key={index}
            x={5.25 * index}
            y={bar.y}
            width="4.25"
            height={bar.height}
            rx="1"
            fill={index + 1 <= numberOfBars ? 'currentColor' : '#E5E5E5'}
          />
        ))}
      </g>
    </svg>
  );
};
