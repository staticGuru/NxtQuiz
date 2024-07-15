import { UserPlan } from '@backend/domain/user-plan/entities/user-plan-entity';

export abstract class UserPlanRepository {
  abstract findByUserId(userId: number): Promise<UserPlan | null>;
  abstract update(userId: number, userPlan: UserPlan): Promise<void>;
}
