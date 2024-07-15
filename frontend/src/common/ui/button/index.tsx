import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

import { cn } from '@frontend/lib/cn';

const buttonStyles = cva(
  clsx(
    'transition-all duration-200 border-[2px] inline-flex items-center justify-center rounded-[8px] font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ),
  {
    variants: {
      variant: {
        unset: '',
        primary: clsx(
          'bg-primary-blue border-primary-blue text-white hover:bg-secondary-blue hover:border-secondary-blue',
        ),
        primaryGradient: clsx(
          'bg-gradient-to-br from-custom-blue-start to-custom-blue-end text-white hover:bg-gradient-to-br hover:from-custom-blue-start hover:to-custom-blue-end',
        ),
        secondary: clsx(
          'bg-white border-border-gray text-primary-gray hover:border-primary-blue hover:text-primary-blue',
        ),
        success: clsx(
          'border-success-green bg-success-green hover:border-success-green/90 hover:bg-success-green/90 text-white focus:ring-success-green',
        ),
        danger: clsx(
          'border-error-red bg-error-red hover:border-error-red/80 hover:bg-error-red/80 text-white focus:ring-error-red',
        ),
        outline: clsx(
          'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        ),
        highlighted: clsx(
          'bg-blue-50 border-2 border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white',
        ),
        subtle: clsx(
          'border-2 border-b-[3px] rounded-xl p-4',
          'flex flex-row items-center border-neutral-200 text-custom-black',
        ),
        ghost: clsx(
          'bg-transparent rounded-xl border-0',
          'flex flex-row items-center text-custom-black hover:opacity-50  focus:ring-0 focus:ring-offset-0',
        ),
      },
      size: {
        small: 'w-36',
        medium: 'w-52',
        large: 'w-96',
      },
      textSize: {
        small: 'text-sm',
        medium: 'text-md',
        large: 'text-lg',
      },
      paddingSize: {
        small: 'py-[4px] px-[7px]',
        medium: 'py-[12px] px-[28px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      textSize: 'medium',
      paddingSize: 'medium',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  textSize,
  paddingSize,
  disabled,
  asChild,
  startIcon,
  endIcon,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        buttonStyles({ variant, size, textSize, paddingSize }),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </Comp>
  );
};
