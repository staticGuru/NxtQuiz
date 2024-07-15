import { Exam } from '@backend/domain/exam/entities/exam-entity';
import { ExamListUseCase } from '@backend/domain/exam/use-cases/exam-list-use-case';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';
import { InMemoryExamRepository } from 'backend/test/repositories/in-memory-exam-repository';

let inMemoryExamRepository: InMemoryExamRepository;
let useCase: ExamListUseCase;

beforeEach(() => {
  inMemoryExamRepository = new InMemoryExamRepository();
  useCase = new ExamListUseCase(inMemoryExamRepository);
});

describe('Exam List Use Case', () => {
  const examData: Exam = Exam.create(
    {
      examName: 'Test Exam',
      examDescription: 'This is a test exam',
      createdBy: 1,
      createdOn: new Date(),
      updatedBy: 1,
      updatedOn: new Date(),
      countryCode: 'US',
      status: 1,
      examSlug: 'test-exam',
    },
    new UniqueEntityID(),
  );

  it('should be able to fetch all exams', async () => {
    await inMemoryExamRepository.create(examData);

    const response = await useCase.execute();
    expect(response).not.toBeNull();
    expect(response.isRight()).toBe(true);
    if (response.isRight()) {
      expect(response.value.exams.length).toBe(1);
      expect(response.value.exams[0].examName).toBe(examData.examName);
    }
  });

  it('should be able to filter exams by country code', async () => {
    const anotherExamData: Exam = Exam.create(
      {
        examName: 'Another Exam',
        examDescription: 'This is another test exam',
        createdBy: 2,
        createdOn: new Date(),
        updatedBy: 2,
        updatedOn: new Date(),
        countryCode: 'CA',
        status: 1,
        examSlug: 'another-exam',
      },
      new UniqueEntityID(),
    );

    await inMemoryExamRepository.create(examData);
    await inMemoryExamRepository.create(anotherExamData);

    const response = await useCase.execute('US');
    expect(response).not.toBeNull();
    expect(response.isRight()).toBe(true);
    if (response.isRight()) {
      expect(response.value.exams.length).toBe(1);
      expect(response.value.exams[0].countryCode).toBe('US');
    }
  });
});
