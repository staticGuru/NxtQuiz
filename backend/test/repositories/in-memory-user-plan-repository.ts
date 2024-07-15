import { UserPlan } from '@backend/domain/user-plan/entities/user-plan-entity';
import { UserPlanRepository } from '@backend/domain/user-plan/repositories/user-plan-repository';

export class InMemoryUserPlanRepository implements UserPlanRepository {
  public items: UserPlan[] = [];

  async findByUserId(userId: number): Promise<UserPlan | null> {
    const userPlan = this.items.find((item) => item.userId === userId);
    return userPlan || null;
  }

  async update(userId: number, userPlan: UserPlan): Promise<void> {
    const index = this.items.findIndex((item) => item.userId === userId);
    if (index !== -1) {
      this.items[index] = userPlan;
    }
  }
}
