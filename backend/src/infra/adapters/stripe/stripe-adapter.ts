import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import {
  StripeAdapterPort,
  StripeCustomer,
  StripeSubscriptionResponse,
  StripeUpdateSubscriptionProps,
} from '@backend/core/ports/stripe-port.interface';

@Injectable()
export class StripeAdapter implements StripeAdapterPort {
  constructor(@Inject('STRIPE_CLIENT') private readonly stripe: Stripe) {}

  async createCustomer(email: string, name: string): Promise<StripeCustomer> {
    const customer = await this.stripe.customers.create({
      email,
      name,
    });
    return {
      id: customer.id,
      email: customer.email ?? '',
      name: customer.name ?? '',
    };
  }

  async createSubscription(
    customerID: string,
    newPlanId: string,
  ): Promise<StripeSubscriptionResponse> {
    const subscription = await this.stripe.subscriptions.create({
      customer: customerID,
      items: [{ plan: newPlanId }],
    });

    return {
      id: subscription.id,
      customer: subscription.customer as string,
      status: subscription.status,
    };
  }

  async updateSubscription({
    subscriptionId,
    stripeId,
    couponId,
  }: StripeUpdateSubscriptionProps): Promise<StripeSubscriptionResponse> {
    const subscription =
      await this.stripe.subscriptions.retrieve(subscriptionId);
    const currentPlanId = subscription.items.data[0].price.id;
    const subscriptionItemId = subscription.items.data[0].id;
    const subscriptionData: Stripe.SubscriptionUpdateParams = {
      billing_cycle_anchor: 'now', // Change the billing cycle to the current date
      trial_end: 'now', // End the trial period
    };

    // If the current plan is different from the new plan, update the subscription
    if (currentPlanId !== stripeId) {
      subscriptionData.items = [
        {
          id: subscriptionItemId,
          price: stripeId,
        },
      ];
    }

    // If a coupon is available, update the subscription with the coupon
    if (couponId) {
      subscriptionData.coupon = couponId;
    }

    const updatedSubscription = await this.stripe.subscriptions.update(
      subscriptionId,
      subscriptionData,
    );

    return {
      id: updatedSubscription.id,
      customer: updatedSubscription.customer as string,
      status: updatedSubscription.status,
    };
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await this.stripe.subscriptions.cancel(subscriptionId);
  }
}
