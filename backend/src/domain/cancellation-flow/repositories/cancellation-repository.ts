import { Cancellation } from '@backend/domain/cancellation-flow/entities/cancellation-entity';

export abstract class CancellationRepository {
  abstract add(cancellation: Cancellation): Promise<void>;
}
