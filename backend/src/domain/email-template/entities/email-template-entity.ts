import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface EmailTemplateProps {
  templateName?: string;
  templateSubject?: string;
  templateBody?: string;
  templateCreated: Date;
  templateUpdated: Date;
}

export class EmailTemplate extends Entity<EmailTemplateProps> {
  get templateName(): string | undefined {
    return this.props.templateName;
  }

  get templateSubject(): string | undefined {
    return this.props.templateSubject;
  }

  get templateBody(): string | undefined {
    return this.props.templateBody;
  }

  get templateCreated(): Date {
    return this.props.templateCreated;
  }

  get templateUpdated(): Date {
    return this.props.templateUpdated;
  }

  set templateName(templateName: string | undefined) {
    this.props.templateName = templateName;
  }

  set templateSubject(templateSubject: string | undefined) {
    this.props.templateSubject = templateSubject;
  }

  set templateBody(templateBody: string | undefined) {
    this.props.templateBody = templateBody;
  }

  static create(props: EmailTemplateProps, id?: UniqueEntityID): EmailTemplate {
    const emailTemplate = new EmailTemplate(
      {
        ...props,
      },
      id,
    );

    return emailTemplate;
  }
}
