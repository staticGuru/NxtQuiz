import React from 'react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  COUNTRY_ROUTE,
  ATTRIBUTION_ROUTE,
} from '@frontend/domain/signup-flow/routes';
import { OptionSelector } from '@frontend/common/ui';
import { SignUpContext } from '@frontend/domain/signup-flow/state';

const attributionData = [
  {
    value: '1',
    label: 'TikTok',
    icon: 'tiktok-icon',
  },
  {
    value: '2',
    label: 'Instagram',
    icon: 'instagram-icon',
  },
  {
    value: '3',
    label: 'Friends/Family',
    icon: 'elephant-friend-icon',
  },
  {
    value: '4',
    label: 'YouTube',
    icon: 'youtube-icon',
  },
  {
    value: '5',
    label: 'Google Search',
    icon: 'google-icon',
  },
  {
    value: '6',
    label: 'Teacher',
    icon: 'school-icon',
  },
  {
    value: '7',
    label: 'News Article',
    icon: 'news-icon',
  },
  {
    value: '8',
    label: 'Other',
    icon: 'other-icon',
  },
];

interface Attribution {
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
 * Attribution Options Page
 *
 * Renders at route /signup/attribution
 */
export const AttributionPage = () => {
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
      className="flex h-full w-full items-center justify-center px-4 md:w-auto"
    >
      <div className="inline-grid w-full grid-cols-1 gap-2 md:w-auto md:auto-rows-min md:grid-cols-2 md:gap-4">
        {attributionData.map((attribution: Attribution) => {
          const isSelected =
            selectedOptions[ATTRIBUTION_ROUTE] === attribution.value;
          return (
            <OptionSelector
              size="medium"
              className="min-h-[60px] w-full py-2.5 sm:w-full md:w-[364px] md:py-4"
              key={attribution.value}
              text={attribution.label}
              isSelected={isSelected}
              onClick={() => {
                // Play the animation when the option is selected
                !isSelected && handleWritingState();

                setSelectedOptions({
                  ...selectedOptions,
                  [ATTRIBUTION_ROUTE]: isSelected ? '' : attribution.value,
                });
              }}
              icon={attribution.icon}
            />
          );
        })}
      </div>
    </motion.div>
  );
};
