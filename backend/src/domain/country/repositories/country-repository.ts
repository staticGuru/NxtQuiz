import { Country } from '@backend/domain/country/entities/country-entity';

export abstract class CountryRepository {
  abstract list(): Promise<Country[]>;
}
