import React from 'react';

import {
  SignUpContext,
  initialSignUpData,
} from '@frontend/domain/signup-flow/state';

export const SignUpProvider = ({ children, handleWritingState }) => {
  const [selectedOptions, setSelectedOptions] =
    React.useState(initialSignUpData);

  return (
    <SignUpContext.Provider
      value={{ selectedOptions, setSelectedOptions, handleWritingState }}
    >
      {children}
    </SignUpContext.Provider>
  );
};
