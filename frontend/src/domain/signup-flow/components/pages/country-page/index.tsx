import React from 'react';
import { motion } from 'framer-motion';

import { VerticalOptionSelector } from '@frontend/common/ui';
import { SignUpContext } from '@frontend/domain/signup-flow/state';
import { COUNTRY_ROUTE } from '@frontend/domain/signup-flow/routes';

const countryData = [
  {
    value: 'UK',
    label: 'United Kingdom',
    icon: 'uk-flag-icon',
  },
  {
    value: 'IE',
    label: 'Ireland',
    icon: 'ireland-flag-icon',
  },
];

interface Country {
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
 * Country Option Page
 *
 * Renders at route /signup/country
 */
export const CountryPage = () => {
  const { selectedOptions, setSelectedOptions, handleWritingState } =
    React.useContext(SignUpContext);

  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={{ type: 'tween', duration: 0.45 }}
      className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 md:flex-row md:gap-5"
    >
      {countryData.map((country: Country) => {
        const isSelected = selectedOptions[COUNTRY_ROUTE] === country.value;
        return (
          <VerticalOptionSelector
            size="large"
            key={country.value}
            text={country.label}
            isSelected={isSelected}
            className="md:auto w-full"
            onClick={() => {
              // Play the animation when the option is selected
              !isSelected && handleWritingState();

              setSelectedOptions({
                ...selectedOptions,
                [COUNTRY_ROUTE]: isSelected ? '' : country.value,
              });
            }}
            icon={country.icon}
          />
        );
      })}
    </motion.div>
  );
};
