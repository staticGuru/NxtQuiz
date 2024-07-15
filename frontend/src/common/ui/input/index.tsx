import React from 'react';
import { Controller, Control } from 'react-hook-form';

import { cn } from '@frontend/lib/cn';

// Base Input component
interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  value?: string;
  iconSrc?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  error?: string;
  labelClassName?: string;
  iconClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      type = 'text',
      placeholder,
      value,
      iconSrc,
      onChange,
      id,
      required,
      maxLength,
      pattern,
      error,
      className,
      labelClassName,
      iconClassName,
      ...restProps
    },
    ref,
  ) => {
    return (
      <label className={cn('w-full', labelClassName)}>
        <div className="relative">
          {iconSrc && (
            <div
              className={cn(
                'absolute left-3 top-0 z-10 flex h-full w-full max-w-5 items-center justify-center',
                iconClassName,
              )}
            >
              {iconSrc}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            type={type}
            placeholder={placeholder}
            defaultValue={value}
            required={required}
            maxLength={maxLength}
            pattern={pattern}
            onChange={onChange}
            className={cn(
              'w-full rounded-lg border-[1px] border-border-gray bg-white px-[13px] py-[9px] font-inter text-base font-normal text-secondary-blue shadow-primaryShadow outline-none transition-all duration-200 placeholder-focus-transparent focus:border-primary-blue focus:shadow-primaryShadowHover focus:outline-none focus:placeholder-shown:text-white',
              iconSrc && 'pl-[40px]',
              error && 'border-red-500',
            )}
            {...restProps}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </label>
    );
  },
);
Input.displayName = 'Input';

// FormInput component for use with react-hook-form
interface FormInputControllerProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
}

const FormInputController = ({
  name,
  control,
  defaultValue,
  children,
}: React.PropsWithChildren<FormInputControllerProps>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) =>
        React.cloneElement(children as React.ReactElement<any>, { ...field })
      }
    />
  );
};

export { Input, FormInputController };
