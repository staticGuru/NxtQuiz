import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { MembershipRepository } from '@backend/domain/membership/repositories/membership-repository';
import { Membership } from '@backend/domain/membership/entities/membership-entity';
import { PrismaMembershipMapper } from '@backend/infra/database/prisma/mappers/prisma-membership-mapper';

@Injectable()
export class PrismaMembershipRepository implements MembershipRepository {
  constructor(private prisma: PrismaService) {}

  async findById(membershipId: number): Promise<Membership | null> {
    const membership = await this.prisma.membership.findUnique({
      where: { membership_id: membershipId },
    });

    return membership ? PrismaMembershipMapper.toDomain(membership) : null;
  }
}
