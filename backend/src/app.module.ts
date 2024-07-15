import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { AuthMiddleware } from './infra/auth/auth.middleware';
import { MailModule } from './infra/adapters/email/mailer.module';
import { StripeModule } from './infra/adapters/stripe/stripe.module';
import { MixpanelModule } from './infra/adapters/mixpanel/mixpanel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    DatabaseModule,
    MailModule,
    StripeModule,
    MixpanelModule,
  ],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/*');
  }
}
