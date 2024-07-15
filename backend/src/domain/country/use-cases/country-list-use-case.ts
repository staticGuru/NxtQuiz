import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { CountryRepository } from '@backend/domain/country/repositories/country-repository';
import { Country } from '@backend/domain/country/entities/country-entity';

type LoadUserProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    countries: Country[];
  }
>;

@Injectable()
export class CountryListUseCase {
  constructor(private countryRepository: CountryRepository) {}

  async execute(): Promise<LoadUserProfileUseCaseResponse> {
    const countries = await this.countryRepository.list();

    if (!countries) {
      return left(new ResourceNotFoundError());
    }

    return right({
      countries,
    });
  }
}
