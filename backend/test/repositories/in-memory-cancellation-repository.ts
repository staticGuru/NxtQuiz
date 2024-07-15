import { CancellationRepository } from '@backend/domain/cancellation-flow/repositories/cancellation-repository';
import { Cancellation } from '@backend/domain/cancellation-flow/entities/cancellation-entity';

export class InMemoryCancellationRepository implements CancellationRepository {
  public items: Cancellation[] = [];

  async add(cancellation: Cancellation): Promise<void> {
    this.items.push(cancellation);
  }
}
