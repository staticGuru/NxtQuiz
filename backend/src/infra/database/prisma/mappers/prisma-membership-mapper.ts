import { membership as PrismaMembership, Prisma } from '@prisma/client';
import { Membership } from '@backend/domain/membership/entities/membership-entity';

export class PrismaMembershipMapper {
  static toDomain(raw: PrismaMembership): Membership {
    return Membership.create({
      membershipId: raw.membership_id,
      membershipType: raw.membership_type,
      planName: raw.plan_name,
      stripeId: raw.stripeId ?? '',
      appleId: raw.apple_id ?? '',
      userAccess: raw.user_access,
      period: raw.period,
      price: raw.price,
      description: raw.description,
      isPopular: raw.is_popular,
      trialPeriod: raw.trial_period,
      status: raw.status,
      orderBy: raw.order_by,
      createdBy: raw.created_by,
      updatedBy: raw.updated_by ?? 0,
      createdOn: raw.created_on,
      updatedOn: raw.updated_on,
      stripePaymentLink: raw.stripe_payment_link ?? '',
      isProduction: raw.is_production ?? 0,
    });
  }

  static toPrisma(
    membership: Membership,
  ): Prisma.membershipUncheckedCreateInput {
    return {
      membership_id: membership.membershipId,
      membership_type: membership.membershipType,
      plan_name: membership.planName,
      stripeId: membership.stripeId,
      apple_id: membership.appleId,
      user_access: membership.userAccess,
      period: membership.period,
      price: membership.price,
      description: membership.description,
      is_popular: membership.isPopular,
      trial_period: membership.trialPeriod,
      status: membership.status,
      order_by: membership.orderBy,
      created_by: membership.createdBy,
      updated_by: membership.updatedBy,
      created_on: membership.createdOn,
      updated_on: membership.updatedOn,
      stripe_payment_link: membership.stripePaymentLink,
      is_production: membership.isProduction,
    };
  }
}
