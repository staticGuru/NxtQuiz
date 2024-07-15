import { ProductImprovement } from '@backend/domain/product-improvement/entities/product-improvement-entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductImprovementResponseDto {
  @ApiProperty()
  productImprovementId: number;

  @ApiProperty()
  productImprovementName: string;

  @ApiProperty()
  productImprovementIcon: string;

  public static toDto(
    productImprovement: ProductImprovement,
  ): ProductImprovementResponseDto {
    return {
      productImprovementId: productImprovement.productImprovementId,
      productImprovementName: productImprovement.productImprovementName,
      productImprovementIcon: productImprovement.productImprovementIcon,
    };
  }
}
