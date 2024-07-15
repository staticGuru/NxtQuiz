import { CancellationReasonRepository } from '@backend/domain/cancellation-flow/repositories/cancellation-reason-repository';
import { CancellationReason } from '@backend/domain/cancellation-flow/entities/cancellation-reason-entity';

export class InMemoryCancellationReasonRepository
  implements CancellationReasonRepository
{
  private items: CancellationReason[] = [];

  async list(): Promise<CancellationReason[]> {
    return this.items;
  }

  async create(cancellationReason: CancellationReason): Promise<void> {
    this.items.push(cancellationReason);
  }
}
