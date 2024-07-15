import React from 'react';
import * as Label from '@radix-ui/react-label';
import { Controller, Control } from 'react-hook-form';

type InputProps = {
  label: string;
  name: string;
  id: string;
  type?: string;
  placeholder: string;
  control: Control<any>;
  defaultValue?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
  requiredMessage?: string;
  error?: string;
};

export const Input: React.FC<InputProps> = ({
  label,
  name,
  id,
  type = 'text',
  placeholder,
  control,
  defaultValue,
  required = false,
  maxLength,
  pattern,
  patternMessage,
  requiredMessage,
  error,
}) => {
  return (
    <div className="mb-4 flex items-center">
      <Label.Root
        className="mr-4 block text-sm font-medium text-gray-700"
        htmlFor={id}
      >
        {label}
      </Label.Root>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            pattern={pattern}
            className={`primary-input block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              error ? 'border-red-500' : ''
            }`}
            {...field}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
