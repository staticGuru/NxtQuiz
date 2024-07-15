import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const spinnerStyles = cva(
  'inline-block border-4 border-t-4 border-gray-200 rounded-full animate-spin',
  {
    variants: {
      size: {
        small: 'w-6 h-6',
        medium: 'w-12 h-12',
        large: 'w-24 h-24',
      },
      color: {
        primary: 'border-t-blue-500',
        secondary: 'border-t-green-500',
        danger: 'border-t-red-500',
      },
    },
    defaultVariants: {
      size: 'medium',
      color: 'primary',
    },
  },
);

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export interface LoadingSpinnerProps
  extends Omit<DivProps, 'color'>,
    VariantProps<typeof spinnerStyles> {}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size,
  color,
  ...props
}) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className={clsx(spinnerStyles({ size, color }), className)}
        {...props}
      />
    </div>
  );
};

export default LoadingSpinner;
