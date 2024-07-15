import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { Subject } from '../entities/subject-entity';
import { SubjectRepository } from '../repositories/subject-repository';

type GetSubjectByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    subject: Subject;
  }
>;

@Injectable()
export class GetSubjectByIdUseCase {
  constructor(private repository: SubjectRepository) {}

  async execute(id: number): Promise<GetSubjectByIdUseCaseResponse> {
    const data = await this.repository.getById(id);

    if (!data) {
      return left(new ResourceNotFoundError());
    }

    return right({
      subject: data,
    });
  }
}
