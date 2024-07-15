import * as React from 'react';
import { motion } from 'framer-motion';
import * as Progress from '@radix-ui/react-progress';

import { cn } from '@frontend/lib/cn';

interface ProgressBarProps {
  value: number;
  containerClassName?: string;
  indicatorClassName?: string;
}

const MotionIndicator = motion(Progress.Indicator);

export const ProgressBar: React.FC<ProgressBarProps> = (
  props: ProgressBarProps,
) => {
  const { value, containerClassName, indicatorClassName } = props;
  const horizontalPadding = value === 0 ? '0' : '6px';

  return (
    <Progress.Root
      className={cn(
        'relative h-5 w-full overflow-hidden rounded-full bg-gray-200',
        containerClassName,
      )}
      value={value}
    >
      <MotionIndicator
        className={cn(
          'h-full w-0 rounded-full bg-[#2CA851] pt-[3px] transition-transform',
          indicatorClassName,
        )}
        animate={{
          width: `${value}%`,
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
        }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <div className="h-1 rounded-full bg-white/10"></div>
      </MotionIndicator>
    </Progress.Root>
  );
};
