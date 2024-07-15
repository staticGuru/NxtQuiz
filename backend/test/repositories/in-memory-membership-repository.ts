import { Membership } from '@backend/domain/membership/entities/membership-entity';
import { MembershipRepository } from '@backend/domain/membership/repositories/membership-repository';

export class InMemoryMembershipRepository implements MembershipRepository {
  public items: Membership[] = [];

  async findById(membershipId: number): Promise<Membership | null> {
    const membership = this.items.find(
      (item) => item.membershipId === membershipId,
    );
    return membership || null;
  }
}
