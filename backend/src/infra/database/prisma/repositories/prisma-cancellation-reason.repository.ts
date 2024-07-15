import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CancellationReasonRepository } from '@backend/domain/cancellation-flow/repositories/cancellation-reason-repository';
import { CancellationReason } from '@backend/domain/cancellation-flow/entities/cancellation-reason-entity';
import { PrismaCancellationReasonMapper } from '@backend/infra/database/prisma/mappers/prisma-cancellation-reason-mapper';

@Injectable()
export class PrismaCancellationReasonRepository
  implements CancellationReasonRepository
{
  constructor(private prisma: PrismaService) {}

  async list(): Promise<CancellationReason[]> {
    const cancellationReasons =
      await this.prisma.cancellation_reason.findMany();

    return cancellationReasons.map(PrismaCancellationReasonMapper.toDomain);
  }
}
