import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CountryRepository } from '@backend/domain/country/repositories/country-repository';
import { Country } from '@backend/domain/country/entities/country-entity';
import { PrismaCountryMapper } from '@backend/infra/database/prisma/mappers/prisma-country-mapper';

@Injectable()
export class PrismaCountryRepository implements CountryRepository {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<Country[]> {
    const countries = await this.prisma.countries.findMany({
      where: {
        is_supported: true,
      },
    });

    return countries.map(PrismaCountryMapper.toDomain);
  }
}
