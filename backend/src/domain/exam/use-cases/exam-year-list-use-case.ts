import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { ExamYear } from '@backend/domain/exam/entities/exam-year-entity';
import { ExamYearRepository } from '@backend/domain/exam/repositories/exam-year-repository';

type LoadExamYearUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    examYears: ExamYear[];
  }
>;

@Injectable()
export class ExamYearListUseCase {
  constructor(private examYearRepository: ExamYearRepository) {}

  async execute(examId?: number): Promise<LoadExamYearUseCaseResponse> {
    const examYears = await this.examYearRepository.list(examId);

    if (!examYears) {
      return left(new ResourceNotFoundError());
    }

    return right({
      examYears,
    });
  }
}
