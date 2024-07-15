import React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@frontend/lib/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const IconButton: React.FC<ButtonProps> = ({
  className,
  disabled,
  asChild,
  children,
  ...props
}) => {
  const Button = asChild ? Slot : 'button';
  return (
    <Button
      className={cn(
        'rounded-full bg-transparent p-2 hover:opacity-80',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};
