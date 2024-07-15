'use client';

import { motion } from 'framer-motion';

import { cn } from '@frontend/lib/cn';
import { OptionSelector } from '@frontend/common/ui';
import { SpeechBubble } from '@frontend/common/ui/speech-bubble';
import { useBreakpoint } from '@frontend/common/hooks/useBreakpoint';
import { useRiveAnimation } from '@frontend/common/components/rive-animation';

import { ANSWER_STATES } from '../data';
import { Question, AnswerStates } from '../types';

interface MCQProps {
  question: Question;
  selectedAnswer: number | null;
  currentState: AnswerStates;
  handleAnswerClick: (index: number) => void;
  embeddedQuizView?: boolean;
}

// MCQ Quiz Component
export const MCQ = ({
  question,
  selectedAnswer,
  currentState,
  handleAnswerClick,
  embeddedQuizView,
}: MCQProps) => {
  const { isBelowSm } = useBreakpoint('sm');

  const { RiveComponent, handleWritingState } = useRiveAnimation({
    src: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/backend/uploads/animations/elephant`,
    stateMachines: 'State Machine 1',
  });

  const isRight = currentState === ANSWER_STATES.RIGHT;
  const isWrong = currentState === ANSWER_STATES.WRONG;

  if (!question) return null;

  return (
    <div
      className={cn(
        'grid h-full w-full overflow-y-auto px-4 md:max-w-[868px]',
        !embeddedQuizView && 'md:place-items-center',
      )}
    >
      <div className="w-full">
        <div
          className={cn(
            'z-10 mb-4 flex w-full flex-col-reverse items-start justify-start gap-[8px] sm:flex-row sm:items-center',
          )}
        >
          <div className="h-[100px] w-[100px] md:h-[134px] md:w-[142px]">
            <RiveComponent />
          </div>
          <SpeechBubble
            message={question.question}
            className="max-w-[600px]"
            arrowOnBottom={isBelowSm}
          />
        </div>

        <motion.div
          key={question.question}
          initial="initial"
          animate="in"
          variants={{
            initial: { opacity: 0 },
            in: { opacity: 1 },
          }}
          transition={{ type: 'tween', duration: 0.45 }}
          className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4"
        >
          {question.answers.map((answer: string, index: number) => {
            const isSelected = index === selectedAnswer;

            return (
              <OptionSelector
                key={answer}
                size="medium"
                isSelected={isSelected}
                selectionType={isRight ? 'success' : isWrong ? 'error' : 'base'}
                className="min-h-[58px] py-2.5 sm:w-full md:w-auto md:max-w-full md:py-4"
                text={answer}
                onClick={() => {
                  if (isRight || isWrong) return;

                  // Play the animation when the option is selected
                  !isSelected && handleWritingState();
                  handleAnswerClick(index);
                }}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
