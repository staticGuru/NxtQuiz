import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductRatingListUseCase } from '@backend/domain/product-rating/use-cases/product-rating-list-use-case';
import { ProductRatingResponseDto } from '@backend/infra/http/dtos/product-rating-response-dto';

@Controller('/api/product-rating')
@ApiCookieAuth('ci_session')
@ApiTags('ProductRating')
export class ProductRatingController {
  constructor(
    private readonly productRatingListUseCase: ProductRatingListUseCase,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of product ratings',
    type: ProductRatingResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handleGet(): Promise<ProductRatingResponseDto[]> {
    const result = await this.productRatingListUseCase.execute();
    if (result.isLeft()) {
      throw new BadRequestException();
    }
    if (!result.value.productRatings) {
      throw new Error('Product ratings not found');
    }
    return result.value.productRatings.map(ProductRatingResponseDto.toDto);
  }
}
