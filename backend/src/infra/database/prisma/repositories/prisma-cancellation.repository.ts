import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CancellationRepository } from '@backend/domain/cancellation-flow/repositories/cancellation-repository';
import { Cancellation } from '@backend/domain/cancellation-flow/entities/cancellation-entity';
import { PrismaCancellationMapper } from '@backend/infra/database/prisma/mappers/prisma-cancellation-mapper';

@Injectable()
export class PrismaCancellationRepository implements CancellationRepository {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<Cancellation[]> {
    const cancellations = await this.prisma.cancellation.findMany();
    return cancellations.map(PrismaCancellationMapper.toDomain);
  }

  async add(cancellation: Cancellation): Promise<void> {
    const raw = PrismaCancellationMapper.toPrisma(cancellation);
    await this.prisma.cancellation.create({ data: raw });
  }
}
