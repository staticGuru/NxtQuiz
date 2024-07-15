import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountryListUseCase } from '@backend/domain/country/use-cases/country-list-use-case';
import { CountryResponseDto } from '@backend/infra/http/dtos/country-response-dto';

@Controller('/api/country')
@ApiCookieAuth('ci_session')
@ApiTags('Country')
export class CountryController {
  constructor(private readonly countryListUseCase: CountryListUseCase) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of countries',
    type: CountryResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handleGet(): Promise<CountryResponseDto[]> {
    const result = await this.countryListUseCase.execute();
    if (result.isLeft()) {
      throw new BadRequestException();
    }
    if (!result.value.countries) {
      throw new Error('Country not found');
    }
    return result.value.countries.map(CountryResponseDto.toDto);
  }
}
