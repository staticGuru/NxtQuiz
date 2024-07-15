import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EmailTemplateRepository } from '@backend/domain/email-template/repositories/email-template-repository';
import { EmailTemplate } from '@backend/domain/email-template/entities/email-template-entity';
import { PrismaEmailTemplateMapper } from '@backend/infra/database/prisma/mappers/prisma-email-template-mapper';

@Injectable()
export class PrismaEmailTemplateRepository implements EmailTemplateRepository {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<EmailTemplate[]> {
    const emailTemplates = await this.prisma.email_templates.findMany();
    return emailTemplates.map(PrismaEmailTemplateMapper.toDomain);
  }

  async getById(id: number): Promise<EmailTemplate | null> {
    const emailTemplate = await this.prisma.email_templates.findUnique({
      where: { id },
    });

    return emailTemplate
      ? PrismaEmailTemplateMapper.toDomain(emailTemplate)
      : null;
  }
}
