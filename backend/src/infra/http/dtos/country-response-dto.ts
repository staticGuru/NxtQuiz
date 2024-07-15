import { Country } from '@backend/domain/country/entities/country-entity';
import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  countryName: string;

  @ApiProperty()
  isSupported: boolean;

  @ApiProperty()
  domain: string;

  public static toDto(country: Country): CountryResponseDto {
    return {
      countryCode: country.countryCode,
      countryName: country.countryName,
      isSupported: country.isSupported,
      domain: country.domain,
    };
  }
}
