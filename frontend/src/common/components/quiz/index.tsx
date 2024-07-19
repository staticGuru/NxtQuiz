'use client';

import { useMeasure } from 'react-use';
import { useState, useEffect, useRef } from 'react';

import { Footer } from './layout/footer';
import { MCQ } from './quiz-type/mcq';
import { ProgressHeader } from './layout/progress-header';
import { DifficultyHeader } from './layout/difficulty-header';

import { LoadingSpinner } from '@frontend/common/ui';
import { ErrorPage } from '@frontend/common/components/error-page';

import { ANSWER_STATES } from './data';
import { Question, AnswerStates } from './types';

type QuizViewProps = {
  embeddedQuizView?: boolean; // Optional prop to indicate if the quiz view is being embedded in another component
  headerType: 'difficulty' | 'progress'; // Prop to indicate if the header type is difficulty or progress
  questions: Question[]; // Question(s) to be rendered
  isLoading: boolean; // Whether the quiz data is loading
  error: Error | null; // Error object if there is an error
  onRetry: () => void; // Function to handle retrying the quiz API
  onSubmit?: (data: any) => void; // Optional function to handle submitting the quiz
};

type QuizProgressProps = {
  correctAnswers: number[];
  wrongAnswers: number[];
};

export const QuizView = ({
  embeddedQuizView,
  headerType,
  questions = [],
  isLoading,
  error,
  onRetry,
  onSubmit,
}: QuizViewProps) => {
  const totalQuestions = questions.length;

  // State for current question number
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  // State for the current answer state (e.g., unselected, selected, right, wrong)
  const [currentState, setCurrentState] = useState<AnswerStates>(
    ANSWER_STATES.UNSELECTED,
  );
  // State for the selected answer index
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  // State for the total number of correct answers
  const [quizProgress, setQuizProgress] = useState<QuizProgressProps>({
    correctAnswers: [],
    wrongAnswers: [],
  });
  // State for the progress percentage
  const [progress, setProgress] = useState<number>(0);
  // State for the duration of the quiz
  const startTime = useRef<number>(Date.now());
  // State to store selected answers for all questions
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  // State for the duration of the quiz
  const [duration, setDuration] = useState<number>(0);

  // Use the useMeasure hook to measure the footer height
  const [footerRef, { height: footerHeight }] = useMeasure<HTMLElement>();
  // Get the current question based on the current question number
  const currentQuestion = questions[currentQuestionNumber];

  // Update progress whenever the current question number changes
  useEffect(() => {
    setProgress((currentQuestionNumber / totalQuestions) * 100);
  }, [currentQuestionNumber, totalQuestions]);

  // Update the current state based on the selected answer
  useEffect(() => {
    if (selectedAnswer !== null) {
      setCurrentState(ANSWER_STATES.SELECTED);
    } else {
      setCurrentState(ANSWER_STATES.UNSELECTED);
    }
  }, [selectedAnswer]);

  // Function to handle checking the answer
  const handleCheckAnswer = () => {
    if (
      currentState === ANSWER_STATES.SELECTED &&
      selectedAnswer === currentQuestion.correctAnswer
    ) {
      setCurrentState(ANSWER_STATES.RIGHT);
      setQuizProgress((prev) => ({
        ...prev,
        correctAnswers: [...prev.correctAnswers, currentQuestion.id],
      }));
    } else {
      setCurrentState(ANSWER_STATES.WRONG);
      setQuizProgress((prev) => ({
        ...prev,
        wrongAnswers: [...prev.wrongAnswers, currentQuestion.id],
      }));
    }

    // Update progress when an answer is checked
    const currentProgress =
      ((currentQuestionNumber + 1) / totalQuestions) * 100;
    setProgress(currentProgress);
    // Set the duration when the quiz is completed
    if (currentProgress === 100) {
      setDuration(Date.now() - startTime.current);
    }
  };

  // Helper function to update selected answers state
  const updateSelectedAnswers = (index: number | null) => {
    setSelectedAnswers((prev) => [
      ...prev.slice(0, currentQuestionNumber),
      index !== null ? index + 1 : -1,
      ...prev.slice(currentQuestionNumber + 1),
    ]);
  };

  // Function to handle clicking the next button
  const handleClickNext = () => {
    if (
      currentState === ANSWER_STATES.RIGHT ||
      currentState === ANSWER_STATES.WRONG
    ) {
      // If on revision screen, do nothing on next click
      if (embeddedQuizView) return;

      // Update the selected answers for the current question
      updateSelectedAnswers(selectedAnswer);

      // If last question, navigate to quiz completed screen with score
      if (currentQuestionNumber === totalQuestions - 1) {
        const score = Math.ceil(
          (quizProgress.correctAnswers.length / totalQuestions) * 100,
        );

        onSubmit &&
          onSubmit({
            score,
            duration,
            selectedAnswers: [
              ...selectedAnswers.slice(0, currentQuestionNumber),
              selectedAnswer !== null ? selectedAnswer + 1 : -1, // Include the last selected answer
            ],
            quizProgress,
          });
      } else {
        // Reset selected answer and move to the next question
        setSelectedAnswer(null);
        setCurrentQuestionNumber((prev) => prev + 1);
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return <ErrorPage handleTryAgain={onRetry} goToUrl="/account/quiz" />;

  // Function to handle answer click
  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(selectedAnswer === index ? null : index);
    console.log(selectedAnswer, index);
  };

  return (
    <div className="relative h-full w-full">
      {/*  Header for showing difficulty of the current question */}
      {headerType === 'difficulty' && (
        <DifficultyHeader difficulty={currentQuestion?.difficulty} />
      )}
      {/*/ Header for showing the progress of the quiz */}
      {headerType === 'progress' && <ProgressHeader progress={progress} />}
      <div
        style={{ paddingBottom: footerHeight }}
        className="flex h-full flex-1 flex-grow flex-col items-center pt-[60px] md:pt-[100px]"
      >
        <MCQ
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          currentState={currentState}
          handleAnswerClick={handleAnswerClick}
          embeddedQuizView={embeddedQuizView}
        />
      </div>
      <Footer
        ref={footerRef}
        currentState={currentState}
        answer={currentQuestion?.correctAnswerDetail ?? ''}
        handleCheckAnswer={handleCheckAnswer}
        handleClickNext={handleClickNext}
        embeddedQuizView={embeddedQuizView}
      />
    </div>
  );
};
