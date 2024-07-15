import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { UserStreakRepository } from '@backend/domain/streak/repositories/user-streak-repository';
import { PrismaUserStreakMapper } from '../mappers/prisma-user-streak-mapper';
import { UserStreak } from '@backend/domain/streak/entities/user-streak-entity';

@Injectable()
export class PrismaUserStreakRepository implements UserStreakRepository {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<UserStreak[]> {
    const userStreaks = await this.prisma.user_streak.findMany();
    return userStreaks.map(PrismaUserStreakMapper.toDomain);
  }

  async findByUserId(userId: number): Promise<UserStreak | null> {
    const userStreak = await this.prisma.user_streak.findFirst({
      where: { user_id: userId },
      orderBy: {
        updated_on: 'desc',
      },
    });

    return userStreak ? PrismaUserStreakMapper.toDomain(userStreak) : null;
  }

  async create(userStreak: UserStreak): Promise<UserStreak> {
    const raw = PrismaUserStreakMapper.toPrisma(userStreak);

    const data = await this.prisma.user_streak.create({
      data: raw,
    });
    return PrismaUserStreakMapper.toDomain(data);
  }

  async update(userStreak: UserStreak): Promise<void> {
    const raw = PrismaUserStreakMapper.toPrisma(userStreak);

    await this.prisma.user_streak.upsert({
      where: { id: Number(userStreak.id) },
      update: raw,
      create: raw,
    });
  }

  async deleteByUserId(userId: number): Promise<void> {
    await this.prisma.user_streak.deleteMany({
      where: { user_id: userId },
    });
  }
}
