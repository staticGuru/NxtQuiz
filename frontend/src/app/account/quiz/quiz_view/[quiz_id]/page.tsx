import { QuizView } from '@frontend/domain/quiz/components';

function QuizViewPage({ params }) {
  const { quiz_id } = params;

  return (
    <div className="h-screen w-full">
      <QuizView id={quiz_id} />
    </div>
  );
}

export default QuizViewPage;
