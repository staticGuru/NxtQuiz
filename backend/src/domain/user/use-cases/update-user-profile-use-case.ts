import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@backend/domain/user/repositories/user-repository';
import {
  BadRequestException,
  ResourceNotFoundError,
} from '@backend/core/errors/errors/resource-not-found-error';
import { User } from '@backend/domain/user/entities/user-entity';
import { ProfileDetailsRepository } from '@backend/domain/user/repositories/profile-details-repository';
import { SubjectRepository } from '@backend/domain/subject/repositories/subject-repository';
import { EmailTemplateIds } from '@backend/domain/email-template/enums/email-template-id.enum';
import { EmailAdapterPort } from '@backend/core/ports/email-port.interface';

interface UpdateUserProfileUseCaseRequest {
  userId: number;
  name: string;
  email: string;
  countryCode: string;
  examId: number | null;
  examYear: number | null;
}

export type UpdateUserProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(
    private userRepository: UsersRepository,
    private profileDetailsRepository: ProfileDetailsRepository,
    private subjectRepository: SubjectRepository,
    private emailAdapter: EmailAdapterPort,
  ) {}

  async execute({
    userId,
    name,
    email,
    countryCode,
    examId,
    examYear,
  }: UpdateUserProfileUseCaseRequest): Promise<UpdateUserProfileUseCaseResponse> {
    // Retrieve user data from the user repository
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    // Check if the email already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser && existingUser.userId !== userId) {
      return left(new BadRequestException('Email already exists'));
    }

    if (email !== existingUser?.email) {
      // Send email to the user new email
      this.emailAdapter.sendMail({
        from: process.env.NO_REPLY_EMAIL ?? '',
        to: email,
        templateId: EmailTemplateIds.EMAIL_UPDATED,
        context: {
          old_email: existingUser?.email,
          new_email: email,
          name: existingUser?.name,
        },
      });
    }

    // Check if the exam year has changed, and if so reset the profile details study_goal
    if (examId !== existingUser?.examId) {
      this.profileDetailsRepository.updateStudyGoalByUserId(userId, '');
    }

    // Check if the exam_id has changed, and if so update the user's subject_id field to
    // include ALL the new subjects for that exam
    if (examId && examId !== existingUser?.examId) {
      // get list of subjects for the new exam
      const subjects = await this.subjectRepository.getSubjectsByExamId(examId);
      user.subjectId = subjects
        ? // join subject ids with a comma
          subjects.map((subject) => subject.subjectId).join(',')
        : null;
    }

    // update user attributes
    user.name = name;
    user.email = email;
    user.countryCode = countryCode;
    user.examId = examId;
    user.examYear = examYear;

    // update user in the DB
    await this.userRepository.save(user);

    return right({
      user: user,
    });
  }
}
