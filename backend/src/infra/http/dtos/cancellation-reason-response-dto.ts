import { CancellationReason } from '@backend/domain/cancellation-flow/entities/cancellation-reason-entity';
import { ApiProperty } from '@nestjs/swagger';

export class CancellationReasonResponseDto {
  @ApiProperty()
  cancellationReasonId: number;

  @ApiProperty()
  cancellationReasonName: string;

  @ApiProperty()
  cancellationReasonIcon: string;

  public static toDto(
    cancellationReason: CancellationReason,
  ): CancellationReasonResponseDto {
    return {
      cancellationReasonId: cancellationReason.cancellationReasonId,
      cancellationReasonName: cancellationReason.cancellationReasonName,
      cancellationReasonIcon: cancellationReason.cancellationReasonIcon,
    };
  }
}
