import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { CancellationReasonRepository } from '@backend/domain/cancellation-flow/repositories/cancellation-reason-repository';
import { CancellationReason } from '@backend/domain/cancellation-flow/entities/cancellation-reason-entity';

type LoadCancellationReasonUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    cancellationReasons: CancellationReason[];
  }
>;

@Injectable()
export class CancellationReasonListUseCase {
  constructor(
    private cancellationReasonRepository: CancellationReasonRepository,
  ) {}

  async execute(): Promise<LoadCancellationReasonUseCaseResponse> {
    const cancellationReasons = await this.cancellationReasonRepository.list();

    if (!cancellationReasons || cancellationReasons.length === 0) {
      return left(new ResourceNotFoundError());
    }

    return right({
      cancellationReasons,
    });
  }
}
