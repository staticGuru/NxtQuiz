import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { UniversityCourseAreaRepository } from '@backend/domain/university-course-area/repositories/university-course-area-repository';
import { UniversityCourseArea } from '@backend/domain/university-course-area/entities/university-course-area-entity';

type LoadUniversityCourseAreaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    universityCourseAreas: UniversityCourseArea[];
  }
>;

@Injectable()
export class UniversityCourseAreaListUseCase {
  constructor(
    private universityCourseAreaRepository: UniversityCourseAreaRepository,
  ) {}

  async execute(): Promise<LoadUniversityCourseAreaUseCaseResponse> {
    const universityCourseAreas =
      await this.universityCourseAreaRepository.list();

    if (!universityCourseAreas) {
      return left(new ResourceNotFoundError());
    }

    return right({
      universityCourseAreas,
    });
  }
}
