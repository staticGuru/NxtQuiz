import { InMemoryQuizRepository } from 'backend/test/repositories/in-memory-quiz-repository';
import { describe, it, expect, beforeEach } from 'vitest';
import { GetQuizUseCase } from './get-quiz-use-cases';
import { Question, Quiz } from '../entities/quiz-entity';

let inMemoryQuizRepository: InMemoryQuizRepository;
let findQuizByIdUseCase: GetQuizUseCase;

beforeEach(() => {
  inMemoryQuizRepository = new InMemoryQuizRepository();
  findQuizByIdUseCase = new GetQuizUseCase(inMemoryQuizRepository);
});

describe('FindQuizByIdUseCase', () => {
  it('should return quiz by id', async () => {
    const questionData = new Question(
      1,
      1,
      1,
      1,
      1,
      'Question?',
      '["Option1", "Option2"]',
      'Option1',
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

    const result = await findQuizByIdUseCase.execute(1);

    expect(result).toEqual(quizData);
  });

  it('should throw error if quiz not found', async () => {
    await expect(findQuizByIdUseCase.execute(999)).rejects.toThrow(
      'Quiz not found',
    );
  });
});
