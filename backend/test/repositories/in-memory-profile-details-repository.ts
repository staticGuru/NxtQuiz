import { ProfileDetailsRepository } from '@backend/domain/user/repositories/profile-details-repository';
import { ProfileDetails } from '@backend/domain/user/entities/profile-details-entity';

export class InMemoryProfileDetailsRepository
  implements ProfileDetailsRepository
{
  private profileDetails: ProfileDetails[] = [];

  async list(countryCode?: string): Promise<ProfileDetails[]> {
    if (countryCode) {
      return this.profileDetails.filter(
        (profileDetail) => profileDetail.countryCode === countryCode,
      );
    }
    return this.profileDetails;
  }

  async create(profileDetail: ProfileDetails): Promise<void> {
    this.profileDetails.push(profileDetail);
  }
}
