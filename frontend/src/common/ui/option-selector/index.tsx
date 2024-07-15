import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@frontend/lib/cn';
import IconMapper from '@frontend/common/mapper/icon';

const optionSelectorStyles = cva(
  cn(
    'transition-all duration-200 border-2 border-b-[3px] rounded-xl p-4 w-full sm:w-80 md:w-96 font-semibold',
    'flex flex-row items-center',
  ),
  {
    variants: {
      isSelected: {
        true: '',
        false: 'border-neutral-200 text-custom-black hover:bg-gray-100/80',
      },
      selectionType: {
        base: '',
        success: '',
        error: '',
      },
      size: {
        small: 'p-2 text-sm',
        medium: 'p-4 text-md',
        large: 'p-6 text-lg',
        xl: 'px-9 pt-5 pb-[14px] text-2xl',
      },
    },
    compoundVariants: [
      {
        isSelected: true,
        selectionType: 'base',
        className: 'border-custom-blue text-custom-blue',
      },
      {
        isSelected: true,
        selectionType: 'success',
        className: 'border-success-green bg-[#E7F3E9] text-success-green',
      },
      {
        isSelected: true,
        selectionType: 'error',
        className: 'border-error-red bg-[#F7E1DC] text-error-red',
      },
    ],
    defaultVariants: {
      isSelected: false,
      selectionType: 'base',
      size: 'medium',
    },
  },
);

const optionSelectorTextIconStyles = cva(
  'transition-all duration-200 h-10 w-10 rounded-lg border border-b-2 flex justify-center items-center',
  {
    variants: {
      isSelected: {
        true: '',
        false: 'border-neutral-200 text-custom-black',
      },
      selectionType: {
        base: '',
        success: '',
        error: '',
      },
    },
    compoundVariants: [
      {
        isSelected: true,
        selectionType: 'base',
        className: 'border-custom-blue text-custom-blue',
      },
      {
        isSelected: true,
        selectionType: 'success',
        className: 'border-success-green bg-[#E7F3E9] text-success-green',
      },
      {
        isSelected: true,
        selectionType: 'error',
        className: 'border-error-red bg-[#F7E1DC] text-error-red',
      },
    ],
    defaultVariants: {
      isSelected: false,
      selectionType: 'base',
    },
  },
);

interface OptionSelectorProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof optionSelectorStyles> {
  asChild?: boolean;
  text: string | React.ReactNode;
  iconClassName?: string;
  icon?: string;
  textIcon?: string;
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({
  className,
  iconClassName,
  isSelected,
  selectionType,
  size,
  asChild,
  text,
  icon,
  textIcon,
  onClick,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        optionSelectorStyles({ isSelected, selectionType, size }),
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <span className="mr-4">
        {textIcon && (
          <span
            className={cn(
              optionSelectorTextIconStyles({ isSelected, selectionType }),
            )}
          >
            {textIcon}
          </span>
        )}
        {icon && <IconMapper iconName={icon} />}
      </span>
      <span className="w-18 text-left">{text}</span>
    </Comp>
  );
};
