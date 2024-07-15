'use client';

import React from 'react';

import { SignUpLayout } from '@frontend/domain/signup-flow/components';

const Layout = ({ children }) => {
  return <SignUpLayout>{children}</SignUpLayout>;
};

export default Layout;
