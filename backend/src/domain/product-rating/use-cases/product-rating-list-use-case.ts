import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { ProductRatingRepository } from '@backend/domain/product-rating/repositories/product-rating-repository';
import { ProductRating } from '@backend/domain/product-rating/entities/product-rating-entity';

type LoadProductRatingUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    productRatings: ProductRating[];
  }
>;

@Injectable()
export class ProductRatingListUseCase {
  constructor(private productRatingRepository: ProductRatingRepository) {}

  async execute(): Promise<LoadProductRatingUseCaseResponse> {
    const productRatings = await this.productRatingRepository.list();

    if (!productRatings) {
      return left(new ResourceNotFoundError());
    }

    return right({
      productRatings,
    });
  }
}
