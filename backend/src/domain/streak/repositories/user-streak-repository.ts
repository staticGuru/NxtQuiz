import { UserStreak } from '../entities/user-streak-entity';

export abstract class UserStreakRepository {
  abstract list(): Promise<UserStreak[]>;
  abstract findByUserId(userId: number): Promise<UserStreak | null>;
  abstract create(userStreak: UserStreak): Promise<UserStreak>;
  abstract update(userStreak: UserStreak): Promise<void>;
  abstract deleteByUserId(userId: number): Promise<void>;
}
