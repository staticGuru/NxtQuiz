import React from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { DownIcon } from '@frontend/common/icons';

type SelectProps = {
  title: string;
  children: React.ReactNode;
  iconSrc?: string;
};

const SelectSS: React.FC<SelectProps> = ({ title, children, iconSrc }) => {
  const [defaultValue, setDefaultValue] = React.useState<string | undefined>(
    undefined,
  );

  // Find the first SelectItemSS with the selected prop and set its text content as defaultValue
  React.useEffect(() => {
    React.Children.forEach(children, (child: any) => {
      if (child.props.selected) {
        setDefaultValue(child.props.children as string);
      }
    });
  }, [children]);

  return (
    <Select.Root>
      <Select.Trigger
        style={{
          background: iconSrc
            ? `url(${iconSrc}) no-repeat 13px center / 20px, linear-gradient(to right, #fff, #fff)`
            : '#fff',
        }}
        className={`inline-flex min-h-[44px] w-full items-center justify-between rounded-lg border-[1px] border-border-gray bg-white px-[13px] py-[9px] font-inter text-base font-normal text-secondary-blue shadow-primaryShadow outline-none transition-all duration-200 focus:outline-none ${
          iconSrc ? 'pl-[40px]' : ''
        }`}
        aria-label={title}
      >
        {/* Use defaultValue */}
        <Select.Value
          defaultValue={defaultValue}
          placeholder={defaultValue ? defaultValue : title}
        />
        <Select.Icon className="">
          <DownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-20 ml-[40px] overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex h-[25px] items-center justify-center bg-white">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="px-[10px] py-[10px] pt-2">
            <Select.Group>
              <Select.Label className="px-[25px] py-3 font-inter text-base font-normal text-secondary-blue">
                {title}
              </Select.Label>
              {children} {/* Render children here */}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

type SelectItemSSProps = {
  selected?: boolean; // Add selected prop
  className?: string;
  children: string; // Change children type to string
  value: string;
};

const SelectItemSS: React.FC<SelectItemSSProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Select.Item
      className={classnames(
        'items-cente relative flex cursor-pointer rounded-[3px] px-[25px] py-[10px] text-[16px] outline-none hover:bg-gray-100',
        className,
      )}
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};

SelectItemSS.displayName = 'SelectItemSS';

export { SelectSS, SelectItemSS };
