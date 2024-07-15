import { product_rating as PrismaProductRating, Prisma } from '@prisma/client';
import { ProductRating } from '@backend/domain/product-rating/entities/product-rating-entity';

export class PrismaProductRatingMapper {
  static toDomain(raw: PrismaProductRating): ProductRating {
    return ProductRating.create({
      productRatingId: raw.product_rating_id,
      productRatingName: raw.product_rating_name,
      productRatingIcon: raw.product_rating_icon ?? '',
    });
  }

  static toPrisma(
    productRating: ProductRating,
  ): Prisma.product_ratingUncheckedCreateInput {
    return {
      product_rating_id: productRating.productRatingId,
      product_rating_name: productRating.productRatingName,
      product_rating_icon: productRating.productRatingIcon,
    };
  }
}
