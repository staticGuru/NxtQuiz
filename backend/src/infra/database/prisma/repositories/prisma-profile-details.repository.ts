import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProfileDetailsRepository } from '@backend/domain/user/repositories/profile-details-repository';
import { ProfileDetails } from '@backend/domain/user/entities/profile-details-entity';
import { PrismaProfileDetailsMapper } from '@backend/infra/database/prisma/mappers/prisma-profile-details-mapper';

@Injectable()
export class PrismaProfileDetailsRepository
  implements ProfileDetailsRepository
{
  constructor(private prisma: PrismaService) {}

  async list(): Promise<ProfileDetails[]> {
    const profileDetailsList = await this.prisma.profile_details.findMany();

    return profileDetailsList.map(PrismaProfileDetailsMapper.toDomain);
  }

  async updateStudyGoalByUserId(
    userId: number,
    studyGoal: string,
  ): Promise<ProfileDetails | null> {
    const updateResult = await this.prisma.profile_details.updateMany({
      where: { user_id: userId },
      data: { study_goal: studyGoal },
    });

    if (updateResult.count === 0) {
      return null;
    }

    // Retrieve the updated profile details to return
    const updatedProfileDetails = await this.prisma.profile_details.findFirst({
      where: { user_id: userId },
    });

    return updatedProfileDetails
      ? PrismaProfileDetailsMapper.toDomain(updatedProfileDetails)
      : null;
  }
}
