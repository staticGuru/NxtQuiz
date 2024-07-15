'use client';

import { cn } from '@frontend/lib/cn';
import { DifficultyIcon, NotesIcon } from '@frontend/common/icons';

import { Difficulty } from '../types';
import { difficultyData } from '../data';

type HeaderProps = {
  difficulty: Difficulty;
};

/**
 * Header Component For Revision Screen
 *
 * A header with a which shows the difficulty of the current question.
 */
export const DifficultyHeader = ({ difficulty = 'regular' }: HeaderProps) => {
  return (
    <div className="z-100 absolute left-0 right-0 top-0 flex h-[52px] w-full flex-row items-center bg-white px-5 py-2.5">
      <header className="flex w-full items-center justify-between text-sm font-semibold text-secondary-blue">
        <div className="flex items-center gap-1">
          <NotesIcon className="h-6 w-6" />
          <span>Revision Question</span>
        </div>
        <div
          className={cn(
            'flex items-center gap-2.5 capitalize',
            difficultyData[difficulty].color,
          )}
        >
          <DifficultyIcon numberOfBars={difficultyData[difficulty].bars} />
          {difficulty}
        </div>
      </header>
    </div>
  );
};
