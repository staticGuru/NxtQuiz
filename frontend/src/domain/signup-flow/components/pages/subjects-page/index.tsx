import React from 'react';
import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';

import {
  COUNTRY_ROUTE,
  EXAM_ROUTE,
  SUBJECT_ROUTE,
} from '@frontend/domain/signup-flow/routes';
import {
  SignUpContext,
  SignUpContextType,
} from '@frontend/domain/signup-flow/state';
import { cn } from '@frontend/lib/cn';
import { VerticalOptionSelector } from '@frontend/common/ui';

const subjectData = {
  1: [
    {
      label: '',
      options: [
        {
          value: 'a3',
          label: 'a3',
          icon: 'math-equations-icon',
        },
        {
          value: 'a10',
          label: 'a10',
          icon: 'globe-books-icon',
        },
        {
          value: 'a13',
          label: 'a13',
          icon: 'science-flasks-icon',
        },
        {
          value: 'b3',
          label: 'b3',
          icon: 'computer-server-icon',
        },
        {
          value: 'b10',
          label: 'b10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'b13',
          label: 'b13',
          icon: 'business-people-icon',
        },
        {
          value: 'c3',
          label: 'c3',
          icon: 'science-flasks-icon',
        },
        {
          value: 'c10',
          label: 'c10',
          icon: 'globe-books-icon',
        },
        {
          value: 'c13',
          label: 'c13',
          icon: 'science-flasks-icon',
        },
        {
          value: 'd3',
          label: 'd3',
          icon: 'math-equations-icon',
        },
        {
          value: 'd10',
          label: 'd10',
          icon: 'computer-server-icon',
        },
        {
          value: 'd13',
          label: 'd13',
          icon: 'globe-books-icon',
        },
        {
          value: 'e3',
          label: 'e3',
          icon: 'business-people-icon',
        },
        {
          value: 'e10',
          label: 'e10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'e13',
          label: 'e13',
          icon: 'math-equations-icon',
        },
      ],
    },
  ],
  2: [
    {
      label: '',
      options: [
        {
          value: 'a3',
          label: 'a3',
          icon: 'math-equations-icon',
        },
        {
          value: 'a10',
          label: 'a10',
          icon: 'globe-books-icon',
        },
        {
          value: 'a13',
          label: 'a13',
          icon: 'science-flasks-icon',
        },
        {
          value: 'b3',
          label: 'b3',
          icon: 'computer-server-icon',
        },
        {
          value: 'b10',
          label: 'b10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'b13',
          label: 'b13',
          icon: 'business-people-icon',
        },
        {
          value: 'c3',
          label: 'c3',
          icon: 'science-flasks-icon',
        },
        {
          value: 'c10',
          label: 'c10',
          icon: 'globe-books-icon',
        },
        {
          value: 'c13',
          label: 'c13',
          icon: 'science-flasks-icon',
        },
        {
          value: 'd3',
          label: 'd3',
          icon: 'math-equations-icon',
        },
        {
          value: 'd10',
          label: 'd10',
          icon: 'computer-server-icon',
        },
        {
          value: 'd13',
          label: 'd13',
          icon: 'globe-books-icon',
        },
        {
          value: 'e3',
          label: 'e3',
          icon: 'business-people-icon',
        },
        {
          value: 'e10',
          label: 'e10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'e13',
          label: 'e13',
          icon: 'math-equations-icon',
        },
      ],
    },
  ],
  3: [
    {
      label: '',
      options: [
        {
          value: 'a3',
          label: 'a3',
          icon: 'math-equations-icon',
        },
        {
          value: 'a10',
          label: 'a10',
          icon: 'globe-books-icon',
        },
        {
          value: 'a13',
          label: 'a13',
          icon: 'science-flasks-icon',
        },
        {
          value: 'b3',
          label: 'b3',
          icon: 'computer-server-icon',
        },
        {
          value: 'b10',
          label: 'b10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'b13',
          label: 'b13',
          icon: 'business-people-icon',
        },
        {
          value: 'c3',
          label: 'c3',
          icon: 'science-flasks-icon',
        },
        {
          value: 'c10',
          label: 'c10',
          icon: 'globe-books-icon',
        },
        {
          value: 'c13',
          label: 'c13',
          icon: 'science-flasks-icon',
        },
        {
          value: 'd3',
          label: 'd3',
          icon: 'math-equations-icon',
        },
        {
          value: 'd10',
          label: 'd10',
          icon: 'computer-server-icon',
        },
        {
          value: 'd13',
          label: 'd13',
          icon: 'globe-books-icon',
        },
        {
          value: 'e3',
          label: 'e3',
          icon: 'business-people-icon',
        },
        {
          value: 'e10',
          label: 'e10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'e13',
          label: 'e13',
          icon: 'math-equations-icon',
        },
      ],
    },
  ],
  10: [
    {
      label: 'AQA',
      options: [
        {
          value: 'a3',
          label: 'a3',
          icon: 'math-equations-icon',
        },
        {
          value: 'a10',
          label: 'a10',
          icon: 'globe-books-icon',
        },
        {
          value: 'a13',
          label: 'a13',
          icon: 'science-flasks-icon',
        },
        {
          value: 'b3',
          label: 'b3',
          icon: 'computer-server-icon',
        },
        {
          value: 'b10',
          label: 'b10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'b13',
          label: 'b13',
          icon: 'business-people-icon',
        },
        {
          value: 'c3',
          label: 'c3',
          icon: 'science-flasks-icon',
        },
        {
          value: 'c10',
          label: 'c10',
          icon: 'globe-books-icon',
        },
        {
          value: 'c13',
          label: 'c13',
          icon: 'science-flasks-icon',
        },
        {
          value: 'd3',
          label: 'd3',
          icon: 'math-equations-icon',
        },
        {
          value: 'd10',
          label: 'd10',
          icon: 'computer-server-icon',
        },
        {
          value: 'd13',
          label: 'd13',
          icon: 'globe-books-icon',
        },
        {
          value: 'e3',
          label: 'e3',
          icon: 'business-people-icon',
        },
        {
          value: 'e10',
          label: 'e10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'e13',
          label: 'e13',
          icon: 'math-equations-icon',
        },
      ],
    },
    {
      label: 'Edexcel',
      options: [
        {
          value: 'Edexceld13',
          label: 'Edexceld13',
          icon: 'globe-books-icon',
        },
        {
          value: 'Edexcele3',
          label: 'Edexcele3',
          icon: 'business-people-icon',
        },
        {
          value: 'Edexcele10',
          label: 'Edexcele10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'Edexcele13',
          label: 'Edexcele13',
          icon: 'math-equations-icon',
        },
      ],
    },
  ],
  13: [
    {
      label: 'AQA',
      options: [
        {
          value: 'a3',
          label: 'a3',
          icon: 'math-equations-icon',
        },
        {
          value: 'a10',
          label: 'a10',
          icon: 'globe-books-icon',
        },
        {
          value: 'a13',
          label: 'a13',
          icon: 'science-flasks-icon',
        },
        {
          value: 'b3',
          label: 'b3',
          icon: 'computer-server-icon',
        },
        {
          value: 'b10',
          label: 'b10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'b13',
          label: 'b13',
          icon: 'business-people-icon',
        },
        {
          value: 'c3',
          label: 'c3',
          icon: 'science-flasks-icon',
        },
        {
          value: 'c10',
          label: 'c10',
          icon: 'globe-books-icon',
        },
        {
          value: 'c13',
          label: 'c13',
          icon: 'science-flasks-icon',
        },
        {
          value: 'd3',
          label: 'd3',
          icon: 'math-equations-icon',
        },
        {
          value: 'd10',
          label: 'd10',
          icon: 'computer-server-icon',
        },
        {
          value: 'd13',
          label: 'd13',
          icon: 'globe-books-icon',
        },
        {
          value: 'e3',
          label: 'e3',
          icon: 'business-people-icon',
        },
        {
          value: 'e10',
          label: 'e10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'e13',
          label: 'e13',
          icon: 'math-equations-icon',
        },
      ],
    },
    {
      label: 'Edexcel',
      options: [
        {
          value: 'Edexceld13',
          label: 'Edexceld13',
          icon: 'globe-books-icon',
        },
        {
          value: 'Edexcele3',
          label: 'Edexcele3',
          icon: 'business-people-icon',
        },
        {
          value: 'Edexcele10',
          label: 'Edexcele10',
          icon: 'medical-doctor-icon',
        },
        {
          value: 'Edexcele13',
          label: 'Edexcele13',
          icon: 'math-equations-icon',
        },
      ],
    },
  ],
};

// Tabs component to switch between different subjects
const Tabs = ({ selectedTab, setSelectedTab, examSpecificSubjects }) => {
  return (
    <div className="mb-5 mt-5 rounded-[10px] border border-secondary-blue/10 md:mt-0">
      {examSpecificSubjects.map(
        (category: { label: string }, index: number) => {
          return (
            <button
              className={cn(
                'min-h-[44px] min-w-[113px] rounded-[10px] font-medium',
                selectedTab === index
                  ? 'bg-primary-blue text-white'
                  : 'bg-white text-secondary-blue',
              )}
              key={index}
              onClick={() => setSelectedTab(index)}
            >
              {category.label}
            </button>
          );
        },
      )}
    </div>
  );
};

interface Subject {
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
 * Subject Options Page
 *
 * Renders at route /signup/subject
 */
export const SubjectsPage = () => {
  const { selectedOptions, setSelectedOptions, handleWritingState } =
    React.useContext<SignUpContextType>(SignUpContext);

  const [selectedTab, setSelectedTab] = React.useState(0);

  // redirect to /signup/country if we direclty land on some other sigup route
  if (!selectedOptions[COUNTRY_ROUTE]) {
    redirect('/signup/' + COUNTRY_ROUTE);
  }

  const examSpecificSubjects = subjectData[selectedOptions[EXAM_ROUTE]];

  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={{ type: 'tween', duration: 0.45 }}
      className="flex h-full w-full flex-col items-center justify-start px-4 pt-2"
    >
      {examSpecificSubjects.length > 1 && (
        <Tabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          examSpecificSubjects={examSpecificSubjects}
        />
      )}
      <div className="flex max-w-5xl flex-row flex-wrap items-center justify-center gap-2 sm:gap-5">
        {examSpecificSubjects[selectedTab].options.map((subject: Subject) => {
          const selectedSubjects = selectedOptions[SUBJECT_ROUTE];
          const isSelected = selectedSubjects.includes(subject.value);
          const selectionNumber = isSelected
            ? selectedSubjects.indexOf(subject.value) + 1
            : 0;

          return (
            <VerticalOptionSelector
              selectionNumber={selectionNumber}
              key={subject.value}
              text={subject.label}
              isSelected={isSelected}
              onClick={() => {
                // Play the animation when the option is selected
                !isSelected && handleWritingState();

                setSelectedOptions({
                  ...selectedOptions,
                  [SUBJECT_ROUTE]: isSelected
                    ? selectedOptions[SUBJECT_ROUTE].filter(
                        (item) => item !== subject.value,
                      )
                    : [...selectedOptions[SUBJECT_ROUTE], subject.value],
                });
              }}
              icon={subject.icon}
            />
          );
        })}
      </div>
    </motion.div>
  );
};
