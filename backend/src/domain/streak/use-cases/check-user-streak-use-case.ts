import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { UserStreakRepository } from '../repositories/user-streak-repository';
import { DateHelper } from '@backend/core/helpers/date-helper';

type StreakStatus = 'completed' | 'pending' | 'incomplete';
type CheckUserStreakResponse = Either<
  ResourceNotFoundError,
  {
    count: number;
    status: StreakStatus;
  }
>;

@Injectable()
export class UserStreakUseCase {
  constructor(private userStreakRepository: UserStreakRepository) {}

  /**
   * Checks the current streak status of a user.
   *
   * @param userId - The ID of the user.
   * @returns Either a ResourceNotFoundError or the user's streak count and status.
   */
  async checkUserStreak(userId: number): Promise<CheckUserStreakResponse> {
    const userStreak = await this.userStreakRepository.findByUserId(userId);

    if (!userStreak) {
      return left(new ResourceNotFoundError());
    }

    const today = DateHelper.getCurrentDate();
    const yesterday = DateHelper.getPreviousDate(today);

    const isTodayCompleted = DateHelper.isSameDay(userStreak.updatedOn, today);
    const isYesterdayCompleted = DateHelper.isSameDay(
      userStreak.updatedOn,
      yesterday,
    );

    let status: StreakStatus;
    let streakCount = userStreak.count;

    if (isTodayCompleted) {
      status = 'completed';
    } else if (isYesterdayCompleted) {
      status = 'pending';
    } else {
      streakCount = 0;
      status = 'incomplete';
    }

    return right({
      count: streakCount,
      status,
    });
  }
}
