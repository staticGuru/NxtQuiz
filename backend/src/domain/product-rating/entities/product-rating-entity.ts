import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface ProductRatingProps {
  productRatingId: number;
  productRatingName: string;
  productRatingIcon: string;
}

export class ProductRating extends Entity<ProductRatingProps> {
  get productRatingId() {
    return this.props.productRatingId;
  }

  get productRatingName() {
    return this.props.productRatingName;
  }

  get productRatingIcon() {
    return this.props.productRatingIcon;
  }

  set productRatingId(productRatingId: number) {
    this.props.productRatingId = productRatingId;
  }

  set productRatingName(productRatingName: string) {
    this.props.productRatingName = productRatingName;
  }

  set productRatingIcon(productRatingIcon: string) {
    this.props.productRatingIcon = productRatingIcon;
  }

  static create(props: ProductRatingProps, id?: UniqueEntityID) {
    const productRating = new ProductRating(
      {
        ...props,
      },
      id,
    );

    return productRating;
  }
}
