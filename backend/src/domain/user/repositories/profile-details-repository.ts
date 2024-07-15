import { ProfileDetails } from '@backend/domain/user/entities/profile-details-entity';

export abstract class ProfileDetailsRepository {
  abstract list(): Promise<ProfileDetails[]>;
  abstract updateStudyGoalByUserId(
    userId: number,
    studyGoal: string,
  ): Promise<ProfileDetails | null>;
}
