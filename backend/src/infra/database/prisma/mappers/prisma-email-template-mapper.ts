// prisma-email-template-mapper.ts
import { email_templates as PrismaEmailTemplate, Prisma } from '@prisma/client';
import { EmailTemplate } from '@backend/domain/email-template/entities/email-template-entity';

export class PrismaEmailTemplateMapper {
  static toDomain(raw: PrismaEmailTemplate): EmailTemplate {
    return EmailTemplate.create({
      templateName: raw.template_name ?? '',
      templateSubject: raw.template_subject ?? '',
      templateBody: raw.template_body ?? '',
      templateCreated: raw.template_created,
      templateUpdated: raw.template_updated,
    });
  }

  static toPrisma(
    emailTemplate: EmailTemplate,
  ): Prisma.email_templatesUncheckedCreateInput {
    return {
      template_name: emailTemplate.templateName,
      template_subject: emailTemplate.templateSubject,
      template_body: emailTemplate.templateBody,
      template_created: emailTemplate.templateCreated,
      template_updated: emailTemplate.templateUpdated,
    };
  }
}
