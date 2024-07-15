import { ProductRating } from '@backend/domain/product-rating/entities/product-rating-entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductRatingResponseDto {
  @ApiProperty()
  productRatingId: number;

  @ApiProperty()
  productRatingName: string;

  @ApiProperty()
  productRatingIcon: string;

  public static toDto(productRating: ProductRating): ProductRatingResponseDto {
    return {
      productRatingId: productRating.productRatingId,
      productRatingName: productRating.productRatingName,
      productRatingIcon: productRating.productRatingIcon,
    };
  }
}
