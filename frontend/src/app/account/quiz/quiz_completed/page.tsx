import { QuizResult } from '@frontend/domain/quiz/components';

const QuizContent = ({ searchParams }) => {
  const score = searchParams?.score || 0;
  const streaks = searchParams?.streaks || 0;
  return <QuizResult score={score} streakCounter={streaks} />;
};

const QuizCompletedPage = (props) => <QuizContent {...props} />;

export default QuizCompletedPage;
