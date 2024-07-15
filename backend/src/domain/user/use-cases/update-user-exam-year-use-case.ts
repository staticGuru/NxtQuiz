import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@backend/domain/user/repositories/user-repository';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { User } from '@backend/domain/user/entities/user-entity';

interface UpdateUserExamYearUseCaseRequest {
  userId: number;
  examYear: number | null;
}

export type UpdateUserExamYearUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class UpdateUserExamYearUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
    examYear,
  }: UpdateUserExamYearUseCaseRequest): Promise<UpdateUserExamYearUseCaseResponse> {
    // Retrieve user data from the user repository
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    // Update user exam year
    user.examYear = examYear;
    await this.userRepository.save(user);

    return right({ user });
  }
}
