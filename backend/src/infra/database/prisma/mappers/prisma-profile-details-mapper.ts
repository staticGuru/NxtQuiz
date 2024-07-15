import {
  profile_details as PrismaProfileDetails,
  Prisma,
} from '@prisma/client';
import { ProfileDetails } from '@backend/domain/user/entities/profile-details-entity';

export class PrismaProfileDetailsMapper {
  static toDomain(raw: PrismaProfileDetails): ProfileDetails {
    return ProfileDetails.create({
      userId: raw.user_id,
      favoriteSubject: raw.favourite_subject || undefined,
      school: raw.school || undefined,
      studyGoal: raw.study_goal || undefined,
      university: raw.university || undefined,
      hourlyStudyGoal: raw.hourly_study_goal || undefined,
      hardestSubject: raw.hardest_subject || undefined,
      schoolId: raw.school_id || undefined,
      studentType: raw.student_type || undefined,
    });
  }

  static toPrisma(
    profileDetails: ProfileDetails,
  ): Prisma.profile_detailsUncheckedCreateInput {
    return {
      user_id: profileDetails.userId,
      favourite_subject: profileDetails.favoriteSubject,
      school: profileDetails.school,
      study_goal: profileDetails.studyGoal,
      university: profileDetails.university,
      hourly_study_goal: profileDetails.hourlyStudyGoal,
      hardest_subject: profileDetails.hardestSubject,
      school_id: profileDetails.schoolId,
      student_type: profileDetails.studentType,
    };
  }
}
