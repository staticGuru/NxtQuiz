import React from 'react';
import AsyncSelect from 'react-select/async';
import { Controller, Control } from 'react-hook-form';
import { SelectAsyncOption } from '@frontend/common/types/form-types';

interface SelectAsyncSelectProps {
  name: string;
  placeholder?: string | undefined;
  isDisabled?: boolean;
  control: Control<any>;
  onChange?: (value: SelectAsyncOption | null) => void;
  options: SelectAsyncOption[] | undefined;
  defaultValue: SelectAsyncOption | null;
  isLoading: boolean;
  error: string | null | undefined;
  id?: string;
}

export const SelectAsyncSelect: React.FC<SelectAsyncSelectProps> = ({
  name,
  id,
  placeholder,
  isDisabled,
  control,
  options,
  onChange,
  defaultValue,
  isLoading,
  error,
}) => {
  const loadOptions = (_, callback: (options: SelectAsyncOption[]) => void) =>
    callback(options || []);

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <AsyncSelect
            {...field}
            loadOptions={loadOptions}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={placeholder || ''}
            isDisabled={isDisabled || false}
            defaultOptions={options || []}
            defaultValue={defaultValue}
            onChange={(value) => {
              field.onChange(value);
              if (onChange) {
                onChange(value);
              }
            }}
            isLoading={isLoading}
            instanceId={id || name} // Add instanceId to avoid ID mismatch
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </>
  );
};
export { AsyncSelect };
