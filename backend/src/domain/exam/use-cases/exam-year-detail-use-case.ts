import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { ExamYearRepository } from '@backend/domain/exam/repositories/exam-year-repository';
import { ExamYear } from '@backend/domain/exam/entities/exam-year-entity';

type ExamYearDetailUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    examYear: ExamYear;
  }
>;

@Injectable()
export class ExamYearDetailUseCase {
  constructor(private examYearRepository: ExamYearRepository) {}

  async execute(examYearId: number): Promise<ExamYearDetailUseCaseResponse> {
    const examYear = await this.examYearRepository.findById(examYearId);

    if (!examYear) {
      return left(new ResourceNotFoundError());
    }

    return right({
      examYear,
    });
  }
}
