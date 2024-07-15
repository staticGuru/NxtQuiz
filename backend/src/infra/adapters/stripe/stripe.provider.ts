import { Provider } from '@nestjs/common';
import Stripe from 'stripe';

export const StripeProvider: Provider = {
  provide: 'STRIPE_CLIENT',
  useFactory: () => {
    const apiKey =
      process.env.NODE_ENV === 'development'
        ? process.env.STRIPE_KEY_DEV
        : process.env.STRIPE_KEY;

    if (!apiKey) {
      throw new Error('Missing Stripe API key');
    }

    return new Stripe(apiKey);
  },
};
