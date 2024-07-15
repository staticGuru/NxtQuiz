import React from 'react';
import * as Label from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Controller, Control } from 'react-hook-form';

type Option = {
  value: string | number;
  label: string;
};

type SelectInputProps = {
  label: string;
  name: string;
  id: string;
  options: Option[];
  control: Control<any>;
  defaultValue?: string | number;
  required?: boolean;
  requiredMessage?: string;
  notBlankMessage?: string;
  error?: string;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  id,
  options,
  control,
  defaultValue,
  required = false,
  requiredMessage,
  notBlankMessage,
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
        defaultValue={String(defaultValue)}
        render={({ field }) => (
          <Select.Root
            value={field.value}
            onValueChange={field.onChange}
            required={required}
          >
            <Select.Trigger
              className={`primary-select block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${error ? 'border-red-500' : ''}`}
              aria-label={label}
              id={id}
            >
              <Select.Value placeholder="Select an option" />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Content>
              <Select.ScrollUpButton>
                <ChevronDownIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="rounded-md border border-gray-300 bg-white shadow-lg">
                {options.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={String(option.value)}
                    className="relative select-none px-8 py-2"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton>
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Root>
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
