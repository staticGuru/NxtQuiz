import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { EmailTemplateRepository } from '@backend/domain/email-template/repositories/email-template-repository';
import { EmailTemplate } from '@backend/domain/email-template/entities/email-template-entity';

type GetEmailTemplateByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    emailTemplate: EmailTemplate;
  }
>;

@Injectable()
export class GetEmailTemplateByIdUseCase {
  constructor(private emailTemplateRepository: EmailTemplateRepository) {}

  async execute(id: number): Promise<GetEmailTemplateByIdUseCaseResponse> {
    const emailTemplate = await this.emailTemplateRepository.getById(id);

    if (!emailTemplate) {
      return left(new ResourceNotFoundError());
    }

    return right({
      emailTemplate,
    });
  }
}
