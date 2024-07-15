import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductRatingRepository } from '@backend/domain/product-rating/repositories/product-rating-repository';
import { ProductRating } from '@backend/domain/product-rating/entities/product-rating-entity';
import { PrismaProductRatingMapper } from '@backend/infra/database/prisma/mappers/prisma-product-rating-mapper';

@Injectable()
export class PrismaProductRatingRepository implements ProductRatingRepository {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<ProductRating[]> {
    const productRatings = await this.prisma.product_rating.findMany();

    return productRatings.map(PrismaProductRatingMapper.toDomain);
  }
}
