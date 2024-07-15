import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface CountryProps {
  countryCode: string;
  countryName: string;
  isSupported: boolean;
  domain: string;
}

export class Country extends Entity<CountryProps> {
  get countryCode() {
    return this.props.countryCode;
  }

  get countryName() {
    return this.props.countryName;
  }

  get isSupported() {
    return this.props.isSupported;
  }

  get domain() {
    return this.props.domain;
  }

  set countryCode(countryCode: string) {
    this.props.countryCode = countryCode;
  }

  set countryName(countryName: string) {
    this.props.countryName = countryName;
  }

  set isSupported(isSupported: boolean) {
    this.props.isSupported = isSupported;
  }

  set domain(domain: string) {
    this.props.domain = domain;
  }

  static create(props: CountryProps, id?: UniqueEntityID) {
    const notes = new Country(
      {
        ...props,
      },
      id,
    );

    return notes;
  }
}
