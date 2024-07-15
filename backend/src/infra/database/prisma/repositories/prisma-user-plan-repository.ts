import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserPlanRepository } from '@backend/domain/user-plan/repositories/user-plan-repository';
import { UserPlan } from '@backend/domain/user-plan/entities/user-plan-entity';
import { PrismaUserPlanMapper } from '@backend/infra/database/prisma/mappers/prisma-user-plan-mapper';

@Injectable()
export class PrismaUserPlanRepository implements UserPlanRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: number): Promise<UserPlan | null> {
    const userPlan = await this.prisma.user_plan.findFirst({
      where: { user_id: userId },
    });

    return userPlan ? PrismaUserPlanMapper.toDomain(userPlan) : null;
  }

  async update(userId: number, userPlan: UserPlan): Promise<void> {
    const existingUserPlan = await this.prisma.user_plan.findFirst({
      where: { user_id: userId },
    });

    if (existingUserPlan) {
      await this.prisma.user_plan.update({
        where: { user_plan_id: existingUserPlan.user_plan_id },
        data: PrismaUserPlanMapper.toPrisma(userPlan),
      });
    } else {
      throw new Error(`User plan with user_id ${userId} not found`);
    }
  }
}
