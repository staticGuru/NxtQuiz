import { Either, left, right } from '@backend/core/either';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { UsersRepository } from '@backend/domain/user/repositories/user-repository';
import { UserPlanRepository } from '@backend/domain/user-plan/repositories/user-plan-repository';
import { MembershipRepository } from '@backend/domain/membership/repositories/membership-repository';
import { CancellationRepository } from '@backend/domain/cancellation-flow/repositories/cancellation-repository';
import { CouponMapping } from '@backend/core/mappers/coupon-mapping';
import { CouponCode } from '@backend/core/enums/coupon-code.enum';
import { UserPlan } from '@backend/domain/user-plan/entities/user-plan-entity';
import { StripeAdapterPort } from '@backend/core/ports/stripe-port.interface';

type CancellationUseCaseResponse = Either<ResourceNotFoundError, any>;

@Injectable()
export class CancellationUseCase {
  constructor(
    private userRepository: UsersRepository,
    private userPlanRepository: UserPlanRepository,
    private membershipRepository: MembershipRepository,
    private cancellationRepository: CancellationRepository,
    private stripeAdapter: StripeAdapterPort,
  ) {}

  async execute(
    userId: number,
    cancellationData: any,
    couponName: string | null,
    cancellationStatus: 'Paused' | 'Completed' | 'Discount',
    isCancelling: boolean,
  ): Promise<CancellationUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new Error('User not found'));
    }

    const userPlan = await this.userPlanRepository.findByUserId(userId);

    if (!userPlan) {
      return left(new Error('User Plan not found'));
    }

    const membership = await this.membershipRepository.findById(
      userPlan.membershipId,
    );

    if (!membership) {
      return left(new Error('Membership not found'));
    }

    cancellationData.userId = userId;
    cancellationData.cancellationStatus = cancellationStatus;

    // Insert cancellation data
    await this.cancellationRepository.add(cancellationData);

    // If user is cancelling, update the user plan status
    if (isCancelling) {
      await this.stripeAdapter.cancelSubscription(userPlan.subscriptionId);
      await this.userPlanRepository.update(userId, {
        ...userPlan,
        membershipCancelledDate: new Date(),
      } as UserPlan);
      return right({});
    }

    // If user is not cancelling, update the subscription with the coupon code
    if (!couponName || !CouponMapping.isValidCouponCode(couponName)) {
      return left(new BadRequestException('Invalid coupon name'));
    }

    // get coupon id
    const couponId = CouponMapping.getCouponId(couponName as CouponCode);

    console.log('Coupon data', {
      couponId,
      couponName,
      membershipId: userPlan.subscriptionId,
      COUPON_SUMMERFREE: process.env.COUPON_SUMMERFREE,
      COUPON_FREEMONTH: process.env.COUPON_FREEMONTH,
      COUPON_FIFTYOFF: process.env.COUPON_FIFTYOFF,
    });

    if (!couponId) {
      return left(new BadRequestException('Coupon not found'));
    }

    // update subscription with coupon
    const updateResult = await this.stripeAdapter.updateSubscription({
      subscriptionId: userPlan.subscriptionId,
      stripeId: membership.stripeId,
      couponId,
    });

    return right(updateResult);
  }
}
