import { Module } from '@nestjs/common';
import { StripeAdapterPort } from '@backend/core/ports/stripe-port.interface';
import { StripeAdapter } from './stripe-adapter';
import { StripeProvider } from './stripe.provider';

@Module({
  providers: [
    StripeProvider,
    {
      provide: StripeAdapterPort,
      useClass: StripeAdapter,
    },
  ],
  exports: [StripeAdapterPort, StripeProvider],
})
export class StripeModule {}
