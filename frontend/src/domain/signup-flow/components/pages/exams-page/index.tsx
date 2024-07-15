import React from 'react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';

import { OptionSelector } from '@frontend/common/ui';
import { SignUpContext } from '@frontend/domain/signup-flow/state';
import { COUNTRY_ROUTE, EXAM_ROUTE } from '@frontend/domain/signup-flow/routes';

const examsData = {
  IE: [
    {
      value: '1',
      label: 'Junior Cycle',
      icon: 'certificate-1-icon',
    },
    {
      value: '2',
      label: 'Leaving Cert',
      icon: 'certificate-2-icon',
    },
  ],
  UK: [
    {
      value: '3',
      label: 'Scottish Highers',
      icon: 'certificate-1-icon',
    },
    {
      value: '10',
      label: 'GCSE',
      icon: 'certificate-2-icon',
    },
    {
      value: '13',
      label: 'A-Level',
      icon: 'certificate-3-icon',
    },
  ],
};

interface Exam {
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
 * Exams Options Page
 *
 * Renders at route /signup/exam
 */
export const ExamsPage = () => {
  const { selectedOptions, setSelectedOptions, handleWritingState } =
    React.useContext(SignUpContext);

  // redirect to /signup/country if we direclty land on some other sigup route
  if (!selectedOptions[COUNTRY_ROUTE]) {
    redirect('/signup/' + COUNTRY_ROUTE);
  }

  const countrySpecificExams = examsData[selectedOptions[COUNTRY_ROUTE]];

  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={{ type: 'tween', duration: 0.45 }}
      className="flex h-full w-full flex-col items-center justify-center px-4"
    >
      {countrySpecificExams.map((exam: Exam) => {
        const isSelected = selectedOptions[EXAM_ROUTE] === exam.value;
        return (
          <OptionSelector
            size="xl"
            key={exam.value}
            text={exam.label}
            isSelected={isSelected}
            className="mb-4 font-medium"
            onClick={() => {
              // Play the animation when the option is selected
              !isSelected && handleWritingState();

              setSelectedOptions({
                ...selectedOptions,
                [EXAM_ROUTE]: isSelected ? '' : exam.value,
              });
            }}
            icon={exam.icon}
          />
        );
      })}
    </motion.div>
  );
};
