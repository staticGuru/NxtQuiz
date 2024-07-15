import React from 'react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';

import { OptionSelector } from '@frontend/common/ui';
import { SignUpContext } from '@frontend/domain/signup-flow/state';
import { COUNTRY_ROUTE, YEAR_ROUTE } from '@frontend/domain/signup-flow/routes';

const yearData = [
  {
    value: '5',
    label: '5th year',
    icon: '5',
  },
  {
    value: '6',
    label: '6th year',
    icon: '6',
  },
] as Year[];

interface Year {
  value: string;
  label: string;
  icon: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: '10vw', // start from the right of the view
  },
  in: {
    opacity: 1,
    x: 0,
  },
};

/**
 * School Year Options Page
 *
 * Renders at route /signup/year
 */
export const YearPage = () => {
  const { selectedOptions, setSelectedOptions, handleWritingState } =
    React.useContext(SignUpContext);

  // redirect to /signup/country if we direclty land on some other sigup route
  if (!selectedOptions[COUNTRY_ROUTE]) {
    redirect('/signup/' + COUNTRY_ROUTE);
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={{ type: 'tween', duration: 0.45 }}
      className="flex h-full w-full flex-col items-center justify-center px-4"
    >
      {yearData.map((year: Year) => {
        const isSelected = selectedOptions[YEAR_ROUTE] === year.value;
        return (
          <OptionSelector
            size="medium"
            key={year.value}
            text={year.label}
            isSelected={isSelected}
            className="mb-4 font-medium"
            onClick={() => {
              // Play the animation when the option is selected
              !isSelected && handleWritingState();

              setSelectedOptions({
                ...selectedOptions,
                [YEAR_ROUTE]: isSelected ? '' : year.value,
              });
            }}
            textIcon={year.icon}
          />
        );
      })}
    </motion.div>
  );
};
