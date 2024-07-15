import clsx from 'clsx';
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@frontend/lib/cn';
import IconMapper from '@frontend/common/mapper/icon';

const verticalOptionSelectorStyles = cva(
  clsx(
    'transition-all duration-200 border-2 border-b-[3px] rounded-xl hover:bg-primary-blue/[0.02]',
    'flex flex-col items-center justify-center relative',
  ),
  {
    variants: {
      isSelected: {
        true: clsx('border-custom-blue text-custom-blue'),
        false: clsx('border-neutral-200 text-custom-black'),
      },
      size: {
        small:
          'gap-1 min-w-[calc(50vw-25px)] xxs:min-w-[168px] sm:min-w-[193px] min-h-[103px] p-2.5 text-base font-semibold',
        large: 'p-6 text-xl font-medium w-full md:w-[350px]',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  },
);

const iconStyles = cva('', {
  variants: {
    size: {
      small: 'h-10 w-10 mb-1',
      large: 'h-20 w-20 mb-[22px]',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

interface VerticalOptionSelectorProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof verticalOptionSelectorStyles> {
  asChild?: boolean;
  text: string | React.ReactNode;
  icon: string;
  selectionNumber?: number | string;
}

export const VerticalOptionSelector: React.FC<VerticalOptionSelectorProps> = ({
  className,
  isSelected,
  size,
  selectionNumber,
  asChild,
  text,
  icon,
  onClick,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        verticalOptionSelectorStyles({ isSelected, size }),
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {!!selectionNumber && (
        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-blue text-xs font-medium text-white">
          {selectionNumber}
        </div>
      )}
      <div className={cn(iconStyles({ size }))}>
        <IconMapper iconName={icon} />
      </div>
      <div>{text}</div>
    </Comp>
  );
};
