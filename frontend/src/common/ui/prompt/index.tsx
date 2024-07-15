import React, { Dispatch, SetStateAction } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { cn } from '@frontend/lib/cn';
import { CloseIcon } from '@frontend/common/icons';
import Image, { StaticImageData } from 'next/image';

interface PromptProps {
  headerImage?: StaticImageData;
  title?: string;
  description?: string;
  lowBottomPadding?: boolean;
  dialogContent?: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Root = ({
  open,
  setOpen,
  children,
  headerImage,
  title,
  description,
  lowBottomPadding,
  dialogContent = null,
}: React.PropsWithChildren<PromptProps>) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          onClick={() => setOpen(false)}
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-secondary-blue/80"
        />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed bottom-0 left-0 right-0 z-50 w-full font-nunito text-secondary-blue sm:left-[50%] sm:top-[50%] sm:m-4 sm:max-w-[400px] sm:translate-x-[-50%] sm:translate-y-[-50%]">
          <AlertDialog.Cancel className="absolute -right-[14px] -top-[14px] overflow-hidden rounded-full border border-primary-blue bg-white p-2 max-sm:hidden">
            <CloseIcon height={12} width={12} className="text-primary-blue" />
          </AlertDialog.Cancel>

          <div className="overflow-hidden rounded-2xl bg-white max-sm:rounded-b-none">
            {headerImage && (
              <div className="sm:h-[180px]">
                <Image src={headerImage} alt="" />
              </div>
            )}
            <div
              className={cn(
                'flex flex-col bg-white p-4 sm:p-6',
                lowBottomPadding && 'pb-2 sm:pb-4',
              )}
            >
              {title && (
                <AlertDialog.Title className="text-center text-xl font-bold sm:text-3xl sm:leading-10">
                  {title}
                </AlertDialog.Title>
              )}
              {description && (
                <AlertDialog.Description className="text-center">
                  {description}
                </AlertDialog.Description>
              )}
              {dialogContent}
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export const Close = AlertDialog.Cancel;
export const Action = AlertDialog.Action;
