import React from 'react';
import { Box, Typography } from '@frontend/common/ui';

export const FormRow: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <Box
    xs={12}
    className="border-b-[1px] border-border-lightGray max-sm:border-0 max-xs:gap-1 max-xs:py-2 sm:flex sm:flex-row sm:border-b-[1px] sm:border-border-lightGray sm:py-5"
  >
    <Box xs={12} sm={6} className="mb-2 sm:mb-0">
      <Typography variant="p" className="text-secondary-gray">
        {label}
      </Typography>
    </Box>
    <Box xs={12} sm={6}>
      {children}
    </Box>
  </Box>
);
