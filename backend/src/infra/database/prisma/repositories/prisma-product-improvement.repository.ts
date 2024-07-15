import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductImprovementRepository } from '@backend/domain/product-improvement/repositories/product-improvement-repository';
import { ProductImprovement } from '@backend/domain/product-improvement/entities/product-improvement-entity';
import { PrismaProductImprovementMapper } from '@backend/infra/database/prisma/mappers/prisma-product-improvement-mapper';

@Injectable()
export class PrismaProductImprovementRepository
  implements ProductImprovementRepository
{
  constructor(private prisma: PrismaService) {}

  async list(): Promise<ProductImprovement[]> {
    const productImprovements =
      await this.prisma.product_improvement.findMany();

    return productImprovements.map(PrismaProductImprovementMapper.toDomain);
  }
}
