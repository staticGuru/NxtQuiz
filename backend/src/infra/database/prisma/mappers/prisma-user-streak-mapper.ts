import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';
import { UserStreak } from '@backend/domain/streak/entities/user-streak-entity';
import { user_streak as PrismaUserStreak, Prisma } from '@prisma/client';

export class PrismaUserStreakMapper {
  static toDomain(raw: PrismaUserStreak): UserStreak {
    return UserStreak.create(
      {
        userId: raw.user_id,
        count: raw.count,
        createdOn: raw.created_on as Date,
        updatedOn: raw.updated_on as Date,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    userStreak: UserStreak,
  ): Prisma.user_streakUncheckedCreateInput {
    return {
      user_id: userStreak.userId,
      count: userStreak.count,
      created_on: userStreak.createdOn,
      updated_on: userStreak.updatedOn,
    };
  }
}
