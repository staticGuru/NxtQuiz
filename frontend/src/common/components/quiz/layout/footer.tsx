'use client';

import { forwardRef, useState } from 'react';

import { cn } from '@frontend/lib/cn';
import { Button } from '@frontend/common/ui';
import {
  CheckWithCircleIcon,
  CrossWithCircleIcon,
  FlagIcon,
} from '@frontend/common/icons';

import { AnswerStates } from '../types';
import { ANSWER_STATES } from '../data';
import ReportPrompt from '../report-prompt';

export type FooterProps = {
  currentState: AnswerStates;
  handleCheckAnswer?: () => void;
  handleClickNext?: () => void;
  answer?: string;
  embeddedQuizView?: boolean;
};

export const Footer = forwardRef<HTMLElement, FooterProps>((props, ref) => {
  const {
    currentState = ANSWER_STATES.UNSELECTED,
    handleCheckAnswer,
    handleClickNext,
    answer,
    embeddedQuizView,
  } = props;

  const [showReportPrompt, setShowReportPrompt] = useState(false);

  const isUnselected = currentState === ANSWER_STATES.UNSELECTED;
  const isSelected = currentState === ANSWER_STATES.SELECTED;
  const isRight = currentState === ANSWER_STATES.RIGHT;
  const isWrong = currentState === ANSWER_STATES.WRONG;

  const handleClick = () => {
    if (isSelected) {
      handleCheckAnswer?.();
    }

    if (isRight || isWrong) {
      handleClickNext?.();
    }
  };

  const renderBottomButtonText = () => {
    if (isUnselected || isSelected) {
      return 'Check your answer';
    }
    if (isRight) {
      return 'Continue';
    }
    if (isWrong) {
      return "Got it, let's go";
    }
  };

  const showBottomButton = !(embeddedQuizView && (isRight || isWrong));

  return (
    <footer
      ref={ref}
      className={cn(
        'absolute bottom-0 left-0 right-0 w-full bg-white',
        isRight && 'bg-[#E7F3E9]',
        isWrong && 'bg-[#F7E1DC]',
      )}
    >
      <div
        className={cn(
          'mx-auto flex h-full w-full max-w-[804px] flex-col',
          isUnselected || isSelected ? 'justify-center' : 'justify-between',
          embeddedQuizView ? 'min-h-[80px]' : 'min-h-[118px] md:min-h-[175px]',
        )}
      >
        {(isRight || isWrong) && (
          <div
            className={cn(
              'mx-5 mt-5 flex items-center justify-between md:text-xl',
              isRight && 'text-success-green',
              isWrong && 'text-error-red',
            )}
          >
            <div className="flex items-center gap-[14px] font-semibold">
              {isRight && (
                <CheckWithCircleIcon className="text-success-green max-md:h-[14px] max-md:w-[14px]" />
              )}
              {isWrong && (
                <CrossWithCircleIcon className="text-error-red max-md:h-[14px] max-md:w-[14px]" />
              )}
              {isRight && 'Well done!!'}
              {isWrong && 'Oopsies'}
            </div>

            <ReportPrompt open={showReportPrompt} setOpen={setShowReportPrompt}>
              <div className="flex items-center gap-[14px] font-medium">
                <FlagIcon
                  className={cn(
                    'h-[17px] w-[17px]',
                    isRight && 'text-success-green',
                    isWrong && 'text-error-red',
                  )}
                />
                Report
              </div>
            </ReportPrompt>
          </div>
        )}

        <div
          className={cn(
            'flex flex-col justify-center p-5',
            isRight && embeddedQuizView && 'pb-0',
            isWrong && embeddedQuizView && 'pb-0 pt-2',
          )}
        >
          {isWrong && (
            <div className="mb-[18px] font-semibold text-error-red md:text-xl">
              {answer}
            </div>
          )}
          {showBottomButton && (
            <div className={cn(isRight && 'md:mb-4')}>
              <Button
                onClick={handleClick}
                variant={
                  isUnselected
                    ? 'outline'
                    : isSelected
                      ? 'primary'
                      : isRight
                        ? 'success'
                        : 'danger'
                }
                className={cn('w-full')}
                disabled={isUnselected}
              >
                {renderBottomButtonText()}
              </Button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
