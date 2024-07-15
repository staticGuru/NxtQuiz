import { Membership } from '@backend/domain/membership/entities/membership-entity';

export abstract class MembershipRepository {
  abstract findById(membershipId: number): Promise<Membership | null>;
}
