import { Either, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { UserStreakRepository } from '../repositories/user-streak-repository';
import { UserStreak } from '../entities/user-streak-entity';
import { DateHelper } from '@backend/core/helpers/date-helper';

type UpdateStreakCounterUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    streakCount: number;
  }
>;

@Injectable()
export class UpdateStreakCounterUseCase {
  constructor(private userStreakRepository: UserStreakRepository) {}

  /**
   * Updates the streak counter for a user.
   * If the user has a streak entry from yesterday or today, the streak is continued.
   * Otherwise, a new streak is started.
   *
   * @param userId - The ID of the user.
   * @returns Either a ResourceNotFoundError or the updated streak count.
   */
  async execute(userId: number): Promise<UpdateStreakCounterUseCaseResponse> {
    // Get the latest streak entry for the user
    const userStreak = await this.userStreakRepository.findByUserId(userId);
    const today = DateHelper.getCurrentDate();

    // if the user has no streak entry or it was created more then 1 day ago, create a new one
    if (
      userStreak === null ||
      DateHelper.dayDifference(userStreak.updatedOn, today) > 1
    ) {
      const newUserStreak = UserStreak.create({
        userId,
        count: 1,
        updatedOn: today,
      });

      await this.userStreakRepository.create(newUserStreak);
      return right({ streakCount: 1 });
    }

    const lastUpdateDate = userStreak.updatedOn;

    if (DateHelper.isSameDay(lastUpdateDate, today) === false) {
      userStreak.count += 1;
      userStreak.updatedOn = today;
      await this.userStreakRepository.update(userStreak);
      return right({ streakCount: userStreak.count });
    }

    return right({ streakCount: userStreak.count });
  }
}
