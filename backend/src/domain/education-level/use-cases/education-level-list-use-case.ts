import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { EducationLevelRepository } from '@backend/domain/education-level/repositories/education-level-repository';
import { EducationLevel } from '@backend/domain/education-level/entities/education-level-entity';

type LoadEducationLevelUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    educationLevels: EducationLevel[];
  }
>;

@Injectable()
export class EducationLevelListUseCase {
  constructor(private educationLevelRepository: EducationLevelRepository) {}

  async execute(): Promise<LoadEducationLevelUseCaseResponse> {
    const educationLevels = await this.educationLevelRepository.list();

    if (!educationLevels) {
      return left(new ResourceNotFoundError());
    }

    return right({
      educationLevels,
    });
  }
}
