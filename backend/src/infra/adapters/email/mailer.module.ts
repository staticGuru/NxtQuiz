import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { EmailAdapter } from './email-adapter';
import { EmailAdapterPort } from '@backend/core/ports/email-port.interface';
import { DatabaseModule } from '@backend/infra/database/database.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST ?? '',
        port: Number(process.env.SMTP_PORT) ?? 587,
        secure: true,
        auth: {
          user: process.env.SMTP_EMAIL_USER,
          pass: process.env.SMTP_EMAIL_PASS,
        },
      },
      defaults: {
        from: `"${process.env.NO_REPLY_EMAIL_FROM_NAME}" <${process.env.SMTP_EMAIL_USER}>`,
      },
      template: {
        dir: join(process.cwd(), 'src/infra/templates/email'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    DatabaseModule,
  ],
  providers: [
    {
      provide: EmailAdapterPort,
      useClass: EmailAdapter,
    },
  ],
  exports: [EmailAdapterPort],
})
export class MailModule {}
