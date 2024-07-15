export interface StripeCustomer {
  id: string;
  email: string;
  name: string;
}

export interface StripeSubscriptionResponse {
  id: string;
  customer: string;
  status: string;
}

export interface UpdateSubscriptionProps {
  couponName?: string;
}

export interface StripeUpdateSubscriptionProps {
  subscriptionId: string;
  stripeId: string;
  couponId?: string;
}

export enum StripePlanId {
  StagingBasicMonthlyPlan = 'price_1Nn7kBDRZZ4zogeo7fetV2jR',
  StagingAdvancedMonthlyPlan = 'price_1Nn7oaDRZZ4zogeoWIoQW4Jv',
}

export enum StripeCouponId {
  SUMMERFREE = 'c2TQc2bz',
  FREEMONTH = 'nn6KfZxJ',
  FIFTYOFF = 'r5uZUtn6',
}

export abstract class StripeAdapterPort {
  abstract createCustomer(email: string, name: string): Promise<StripeCustomer>;
  abstract updateSubscription(
    props: StripeUpdateSubscriptionProps,
  ): Promise<StripeSubscriptionResponse>;
  abstract cancelSubscription(subscriptionId: string): Promise<void>;
  abstract createSubscription(
    customerID: string,
    newPlanId: string,
  ): Promise<StripeSubscriptionResponse>;
}
