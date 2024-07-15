// email-template-repository.ts
import { EmailTemplate } from '@backend/domain/email-template/entities/email-template-entity';

export abstract class EmailTemplateRepository {
  abstract list(): Promise<EmailTemplate[]>;
  abstract getById(id: number): Promise<EmailTemplate | null>;
}
