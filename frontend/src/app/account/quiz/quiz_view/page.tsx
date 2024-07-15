import { redirect } from 'next/navigation';

async function QuizViewRedirectPage({ searchParams }) {
  const quizId = searchParams?.quiz_id;

  if (quizId) redirect('/account/quiz/quiz_view/' + quizId);
  redirect('/account/quiz');

  return <></>;
}

export default QuizViewRedirectPage;
