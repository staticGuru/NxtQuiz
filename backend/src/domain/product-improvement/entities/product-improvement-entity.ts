import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface ProductImprovementProps {
  productImprovementId: number;
  productImprovementName: string;
  productImprovementIcon: string;
}

export class ProductImprovement extends Entity<ProductImprovementProps> {
  get productImprovementId() {
    return this.props.productImprovementId;
  }

  get productImprovementName() {
    return this.props.productImprovementName;
  }

  get productImprovementIcon() {
    return this.props.productImprovementIcon;
  }

  set productImprovementId(productImprovementId: number) {
    this.props.productImprovementId = productImprovementId;
  }

  set productImprovementName(productImprovementName: string) {
    this.props.productImprovementName = productImprovementName;
  }

  set productImprovementIcon(productImprovementIcon: string) {
    this.props.productImprovementIcon = productImprovementIcon;
  }

  static create(props: ProductImprovementProps, id?: UniqueEntityID) {
    const productImprovement = new ProductImprovement(
      {
        ...props,
      },
      id,
    );

    return productImprovement;
  }
}
