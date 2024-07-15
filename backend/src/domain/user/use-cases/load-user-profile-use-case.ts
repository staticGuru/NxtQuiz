import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@backend/domain/user/repositories/user-repository';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { User } from '@backend/domain/user/entities/user-entity';

interface LoadUserProfileUseCaseRequest {
  userId: number;
}

type LoadUserProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class LoadUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: LoadUserProfileUseCaseRequest): Promise<LoadUserProfileUseCaseResponse> {
    // Retrieve user data from the user repository
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    return right({
      user,
    });
  }
}
