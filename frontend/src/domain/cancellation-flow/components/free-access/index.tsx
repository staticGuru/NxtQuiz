import React from 'react';
import { OptionSelector } from '@frontend/common/ui';
import { IconGroup } from '@frontend/common/icons';

// This component is used to display the free access section
export const FreeAccess = () => {
  return (
    <div className="mt-32 flex flex-1 flex-col items-start overflow-hidden md:mt-0">
      <div className="invisible mb-4 w-fit rounded-full bg-gradient-to-r from-[#1CB0F6] to-[#397CFF] px-4 py-2 font-semibold text-white md:visible">
        You are getting FREE ACCESS
      </div>
      <div className="mt-4 flex w-full flex-col lg:w-3/5">
        <span className="mb-1 text-center text-2xl font-bold leading-tight text-white md:mb-3 md:text-start md:text-3xl">
          Built for university.
        </span>
        <span className="mb-1 text-center text-4xl font-bold leading-tight text-white md:mb-2 md:text-start md:text-5xl">
          Made for students.
        </span>
        <p className="mt-4 text-center text-sm text-white sm:text-lg md:text-start md:text-xl">
          <span>
            Our new study product for university students is awesome - and you
            can
          </span>
          <span className="font-semibold"> get early access for FREE</span>.
        </p>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 lg:mx-0 lg:mr-auto">
        <OptionSelector
          disabled={true}
          style={{ background: '#FFFFFF', padding: '0.25rem 0.75rem' }}
          icon="weight-icon"
          text="Generate quiz questions"
        />
        <OptionSelector
          disabled={true}
          style={{ background: '#FFFFFF', padding: '0.25rem 0.75rem' }}
          icon="flashcard-icon"
          text="Create and share flashcard sets"
        />
        <OptionSelector
          disabled={true}
          className="hidden md:block"
          style={{ background: '#FFFFFF', padding: '0.25rem 0.75rem' }}
          icon="building-blocks-icon"
          text="Worked answers from textbooks"
        />
        <OptionSelector
          disabled={true}
          style={{ background: '#FFFFFF', padding: '0.25rem 0.75rem' }}
          icon="notes-icon"
          text="Instantly create revision notes"
        />
      </div>

      <div className="mt-6 w-[21rem] self-center md:w-[42rem] lg:mt-14 lg:self-start">
        <IconGroup />
      </div>
    </div>
  );
};
