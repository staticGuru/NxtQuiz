import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScreenBaseProps } from '@frontend/domain/cancellation-flow/interfaces/component-props';

// This component is used to display the base screen
export const ScreenBase = (props: ScreenBaseProps) => {
  const {
    children,
    style,
    onContinue,
    isContinueButtonDisabled = false,
    headerEndAddornment,
    customFooter = null,
    selections,
    selectionsString,
  } = props;

  return (
    <div
      style={style}
      className="flex h-screen flex-col bg-white px-12 py-8 max-md:p-4"
    >
      <Header headerEndAddornment={headerEndAddornment} />
      <div className="flex flex-1 flex-col">{children}</div>
      {customFooter || (
        <Footer
          isContinueButtonDisabled={isContinueButtonDisabled}
          onContinue={onContinue}
          selections={selections}
          selectionsString={selectionsString}
        />
      )}
    </div>
  );
};
