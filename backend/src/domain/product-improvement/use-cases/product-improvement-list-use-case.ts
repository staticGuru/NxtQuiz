import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { ProductImprovementRepository } from '@backend/domain/product-improvement/repositories/product-improvement-repository';
import { ProductImprovement } from '@backend/domain/product-improvement/entities/product-improvement-entity';

type LoadProductImprovementUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    productImprovements: ProductImprovement[];
  }
>;

@Injectable()
export class ProductImprovementListUseCase {
  constructor(
    private productImprovementRepository: ProductImprovementRepository,
  ) {}

  async execute(): Promise<LoadProductImprovementUseCaseResponse> {
    const productImprovements = await this.productImprovementRepository.list();

    if (!productImprovements) {
      return left(new ResourceNotFoundError());
    }

    return right({
      productImprovements,
    });
  }
}
