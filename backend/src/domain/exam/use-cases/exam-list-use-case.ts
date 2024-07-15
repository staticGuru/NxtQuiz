import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { ExamRepository } from '@backend/domain/exam/repositories/exam-repository';
import { Exam } from '@backend/domain/exam/entities/exam-entity';

type LoadExamListUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    exams: Exam[];
  }
>;

@Injectable()
export class ExamListUseCase {
  constructor(private examRepository: ExamRepository) {}

  async execute(countryCode?: string): Promise<LoadExamListUseCaseResponse> {
    const exams = await this.examRepository.list(countryCode);

    if (!exams) {
      return left(new ResourceNotFoundError());
    }

    return right({
      exams,
    });
  }
}
