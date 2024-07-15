import {
  product_improvement as PrismaProductImprovement,
  Prisma,
} from '@prisma/client';
import { ProductImprovement } from '@backend/domain/product-improvement/entities/product-improvement-entity';

export class PrismaProductImprovementMapper {
  static toDomain(raw: PrismaProductImprovement): ProductImprovement {
    return ProductImprovement.create({
      productImprovementId: raw.product_improvement_id,
      productImprovementName: raw.product_improvement_name,
      productImprovementIcon: raw.product_improvement_icon ?? '',
    });
  }

  static toPrisma(
    productImprovement: ProductImprovement,
  ): Prisma.product_improvementUncheckedCreateInput {
    return {
      product_improvement_id: productImprovement.productImprovementId,
      product_improvement_name: productImprovement.productImprovementName,
      product_improvement_icon: productImprovement.productImprovementIcon,
    };
  }
}
