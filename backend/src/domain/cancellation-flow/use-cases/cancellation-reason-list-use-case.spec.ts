import { InMemoryCancellationReasonRepository } from 'backend/test/repositories/in-memory-cancellation-reason-repository';
import { CancellationReason } from '@backend/domain/cancellation-flow/entities/cancellation-reason-entity';
import { CancellationReasonListUseCase } from './cancellation-reason-list-use-case';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';

let inMemoryCancellationReasonRepository: InMemoryCancellationReasonRepository;
let useCase: CancellationReasonListUseCase;

beforeEach(() => {
  inMemoryCancellationReasonRepository =
    new InMemoryCancellationReasonRepository();
  useCase = new CancellationReasonListUseCase(
    inMemoryCancellationReasonRepository,
  );
});

describe('CancellationReasonListUseCase', () => {
  const cancellationReasonData: CancellationReason = CancellationReason.create(
    {
      cancellationReasonId: 1,
      cancellationReasonName: 'No longer needed',
      cancellationReasonIcon: 'icon-path',
    },
    new UniqueEntityID(1),
  );

  it('should be able to fetch a list of cancellation reasons', async () => {
    await inMemoryCancellationReasonRepository.create(cancellationReasonData);
    const response = await useCase.execute();
    expect(response).not.toBeNull();
    expect(response.isRight()).toBe(true);
    if (response.isRight()) {
      expect(response.value.cancellationReasons.length).toBeGreaterThan(0);
      expect(response.value.cancellationReasons[0].cancellationReasonId).toBe(
        1,
      );
    }
  });

  it('should return a ResourceNotFoundError if no cancellation reasons are found', async () => {
    const response = await useCase.execute();
    expect(response).not.toBeNull();
    expect(response.isLeft()).toBe(true);
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(ResourceNotFoundError);
    }
  });
});
