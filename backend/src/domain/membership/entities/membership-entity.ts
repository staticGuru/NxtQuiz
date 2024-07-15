import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface MembershipProps {
  membershipId: number;
  membershipType: number;
  planName: string;
  stripeId: string;
  appleId: string;
  userAccess: number;
  period: string;
  price: string;
  description: string;
  isPopular: number;
  trialPeriod: string;
  status: number;
  orderBy: number;
  createdBy: number;
  updatedBy: number;
  createdOn: Date;
  updatedOn: Date;
  stripePaymentLink: string;
  isProduction: number;
}

export class Membership extends Entity<MembershipProps> {
  get membershipId() {
    return this.props.membershipId;
  }

  get membershipType() {
    return this.props.membershipType;
  }

  get planName() {
    return this.props.planName;
  }

  get stripeId() {
    return this.props.stripeId;
  }

  get appleId() {
    return this.props.appleId;
  }

  get userAccess() {
    return this.props.userAccess;
  }

  get period() {
    return this.props.period;
  }

  get price() {
    return this.props.price;
  }

  get description() {
    return this.props.description;
  }

  get isPopular() {
    return this.props.isPopular;
  }

  get trialPeriod() {
    return this.props.trialPeriod;
  }

  get status() {
    return this.props.status;
  }

  get orderBy() {
    return this.props.orderBy;
  }

  get createdBy() {
    return this.props.createdBy;
  }

  get updatedBy() {
    return this.props.updatedBy;
  }

  get createdOn() {
    return this.props.createdOn;
  }

  get updatedOn() {
    return this.props.updatedOn;
  }

  get stripePaymentLink() {
    return this.props.stripePaymentLink;
  }

  get isProduction() {
    return this.props.isProduction;
  }

  static create(props: MembershipProps, id?: UniqueEntityID) {
    const membership = new Membership(
      {
        ...props,
      },
      id,
    );

    return membership;
  }
}
