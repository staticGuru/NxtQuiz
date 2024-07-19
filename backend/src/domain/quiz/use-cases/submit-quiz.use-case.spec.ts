import { InMemoryQuizProgressRepository } from 'backend/test/repositories/in-memory-quiz-progress-repository';
import { InMemoryQuizRepository } from 'backend/test/repositories/in-memory-quiz-repository';
import { describe, it, expect, beforeEach } from 'vitest';
import { SubmitQuizUseCase } from './submit-quiz-use-cases';
import { Question, Quiz, QuizProgress } from '../entities/quiz-entity';

let inMemoryQuizRepository: InMemoryQuizRepository;
let inMemoryQuizProgressRepository: InMemoryQuizProgressRepository;
let submitQuizUseCase: SubmitQuizUseCase;

beforeEach(() => {
  inMemoryQuizRepository = new InMemoryQuizRepository();
  inMemoryQuizProgressRepository = new InMemoryQuizProgressRepository();
  submitQuizUseCase = new SubmitQuizUseCase(
    inMemoryQuizRepository,
    inMemoryQuizProgressRepository,
  );
});

describe('SubmitQuizUseCase', () => {
  it('should return score and save quiz progress', async () => {
    const questionData = new Question(
      1,
      1,
      1,
      1,
      1,
      'Question?',
      'Option1,Option2',
      '1',
      null,
      new Date(),
      null,
      null,
      0,
    );

    const quizData = new Quiz(
      1,
      'Test Quiz',
      1,
      1,
      1,
      1,
      '1,2,3',
      60,
      1,
      1,
      1,
      'TEST',
      new Date(),
      null,
      null,
      [questionData],
    );

    await inMemoryQuizRepository.create(quizData);

    const progress = { correctAnswers: [1], wrongAnswers: [2, 3] };
    const result = await submitQuizUseCase.execute(
      1,
      1,
      JSON.stringify(progress),
    );

    expect(result).toBe(34);
    expect(typeof result).toBe('number');

    const quizProgress = new QuizProgress(
      1,
      1,
      1,
      1,
      1,
      1,
      '1',
      '',
      new Date(),
      new Date(),
    );

    await inMemoryQuizProgressRepository.create(quizProgress);
  });

  it('should throw error if quiz not found', async () => {
    await expect(
      submitQuizUseCase.execute(999, 1, JSON.stringify(['Option1'])),
    ).rejects.toThrow('Quiz not found');
  });
});
