import { countries as PrismaCountry, Prisma } from '@prisma/client';
import { Country } from '@backend/domain/country/entities/country-entity';

export class PrismaCountryMapper {
  static toDomain(raw: PrismaCountry): Country {
    return Country.create({
      countryCode: raw.country_code,
      countryName: raw.country_name,
      isSupported: raw.is_supported,
      domain: raw.domain || '',
    });
  }

  static toPrisma(country: Country): Prisma.countriesUncheckedCreateInput {
    return {
      country_code: country.countryCode,
      country_name: country.countryName,
      is_supported: country.isSupported,
      domain: country.domain,
    };
  }
}
