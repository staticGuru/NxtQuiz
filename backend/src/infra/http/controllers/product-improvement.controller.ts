import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductImprovementListUseCase } from '@backend/domain/product-improvement/use-cases/product-improvement-list-use-case';
import { ProductImprovementResponseDto } from '@backend/infra/http/dtos/product-improvement-response-dto';

@Controller('/api/product-improvement')
@ApiCookieAuth('ci_session')
@ApiTags('ProductImprovement')
export class ProductImprovementController {
  constructor(
    private readonly productImprovementListUseCase: ProductImprovementListUseCase,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of product improvements',
    type: ProductImprovementResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handleGet(): Promise<ProductImprovementResponseDto[]> {
    const result = await this.productImprovementListUseCase.execute();
    if (result.isLeft()) {
      throw new BadRequestException();
    }
    if (!result.value.productImprovements) {
      throw new Error('Product improvements not found');
    }
    return result.value.productImprovements.map(
      ProductImprovementResponseDto.toDto,
    );
  }
}
