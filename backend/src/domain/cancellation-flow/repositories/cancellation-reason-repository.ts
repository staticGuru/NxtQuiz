import { CancellationReason } from '@backend/domain/cancellation-flow/entities/cancellation-reason-entity';

export abstract class CancellationReasonRepository {
  abstract list(): Promise<CancellationReason[]>;
}
