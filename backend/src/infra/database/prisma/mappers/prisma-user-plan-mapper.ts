import { user_plan as PrismaUserPlan, Prisma } from '@prisma/client';
import { UserPlan } from '@backend/domain/user-plan/entities/user-plan-entity';

export class PrismaUserPlanMapper {
  static toDomain(raw: PrismaUserPlan): UserPlan {
    return UserPlan.create({
      userPlanId: raw.user_plan_id,
      userId: raw.user_id,
      membershipId: raw.membership_id,
      membershipStartDate: raw.membership_start_date,
      membershipExpiryDate: raw.membership_expiry_date,
      membershipCancelledDate: raw.membership_cancelled_date,
      txnId: raw.txn_id,
      subscriptionId: raw.subscription_id,
      updatedOn: raw.updated_on,
      createdOn: raw.created_on,
      status: raw.status,
      billingService: raw.billing_service,
      rvtStatus: raw.rvt_status,
    });
  }

  static toPrisma(userPlan: UserPlan): Prisma.user_planUncheckedCreateInput {
    return {
      user_plan_id: userPlan.userPlanId,
      user_id: userPlan.userId,
      membership_id: userPlan.membershipId,
      membership_start_date: userPlan.membershipStartDate,
      membership_expiry_date: userPlan.membershipExpiryDate,
      membership_cancelled_date: userPlan.membershipCancelledDate,
      txn_id: userPlan.txnId,
      subscription_id: userPlan.subscriptionId,
      updated_on: userPlan.updatedOn,
      created_on: userPlan.createdOn,
      status: userPlan.status,
      rvt_status: userPlan.rvtStatus,
    };
  }
}
