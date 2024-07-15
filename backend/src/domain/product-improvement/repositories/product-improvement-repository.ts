import { ProductImprovement } from '@backend/domain/product-improvement/entities/product-improvement-entity';

export abstract class ProductImprovementRepository {
  abstract list(): Promise<ProductImprovement[]>;
}
