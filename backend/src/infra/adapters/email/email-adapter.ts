import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailTemplateRepository } from '@backend/domain/email-template/repositories/email-template-repository';
import {
  EmailAdapterPort,
  EmailOptions,
} from '@backend/core/ports/email-port.interface';

@Injectable()
export class EmailAdapter implements EmailAdapterPort {
  constructor(
    private readonly mailerService: MailerService,
    private readonly emailTemplateRepository: EmailTemplateRepository,
  ) {}

  // Method to replace placeholders in the template with actual values from the context
  replacePlaceholders(template: string, context: Record<string, any>): string {
    return template.replace(/{(.*?)}/g, (match, key) => {
      const trimmedKey = key.trim();
      return context[trimmedKey] !== undefined ? context[trimmedKey] : match;
    });
  }

  // Method to send email
  async sendMail(mailOptions: EmailOptions): Promise<any> {
    const { from, to, subject, text, html, template, context, templateId } =
      mailOptions;

    // Add base_url and cdn_url to the context
    const contextProps = {
      ...context,
      base_url: process.env.APP_URL,
      cdn_url: process.env.CDN_URL ?? '',
    };

    // If a templateId is provided, fetch the template content from the repository
    if (templateId && templateId > 0) {
      const templateContent =
        await this.emailTemplateRepository.getById(templateId);

      // If template content is not found, throw an error
      if (!templateContent) {
        throw new Error('Email Template not found');
      }

      // Replace placeholders in the template body
      const emailMessage = this.replacePlaceholders(
        templateContent.templateBody || '',
        contextProps,
      );

      // Send the email using the mailerService with the template subject and body
      return this.mailerService.sendMail({
        from,
        to,
        subject: templateContent.templateSubject,
        template: template ?? 'template.html.hbs',
        context: {
          ...contextProps,
          email_message: emailMessage,
        },
      });
    }

    // If no templateId is provided, send the email with the provided subject, text, and html
    return this.mailerService.sendMail({
      from,
      to,
      subject,
      text,
      html,
      template: template ?? 'template.html.hbs',
      context: contextProps,
    });
  }
}
