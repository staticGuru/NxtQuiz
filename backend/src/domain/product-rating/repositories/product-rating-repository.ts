import { ProductRating } from '@backend/domain/product-rating/entities/product-rating-entity';

export abstract class ProductRatingRepository {
  abstract list(): Promise<ProductRating[]>;
}
