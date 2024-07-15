import {
  cancellation_reason as PrismaCancellationReason,
  Prisma,
} from '@prisma/client';
import { CancellationReason } from '@backend/domain/cancellation-flow/entities/cancellation-reason-entity';

export class PrismaCancellationReasonMapper {
  static toDomain(raw: PrismaCancellationReason): CancellationReason {
    return CancellationReason.create({
      cancellationReasonId: raw.cancellation_reason_id,
      cancellationReasonName: raw.cancellation_reason_name,
      cancellationReasonIcon: raw.cancellation_reason_icon ?? '',
    });
  }

  static toPrisma(
    cancellationReason: CancellationReason,
  ): Prisma.cancellation_reasonUncheckedCreateInput {
    return {
      cancellation_reason_id: cancellationReason.cancellationReasonId,
      cancellation_reason_name: cancellationReason.cancellationReasonName,
      cancellation_reason_icon: cancellationReason.cancellationReasonIcon,
    };
  }
}
