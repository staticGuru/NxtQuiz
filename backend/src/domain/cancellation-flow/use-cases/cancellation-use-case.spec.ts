import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from 'backend/test/repositories/in-memory-user-repository';
import { InMemoryUserPlanRepository } from 'backend/test/repositories/in-memory-user-plan-repository';
import { InMemoryMembershipRepository } from 'backend/test/repositories/in-memory-membership-repository';
import { InMemoryCancellationRepository } from 'backend/test/repositories/in-memory-cancellation-repository';
import { CancellationUseCase } from './cancellation-use-case';
import { User } from '@backend/domain/user/entities/user-entity';
import { UserPlan } from '@backend/domain/user-plan/entities/user-plan-entity';
import { Membership } from '@backend/domain/membership/entities/membership-entity';
import { StripeAdapter } from '@backend/infra/adapters/stripe/stripe-adapter';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';
import { CouponCode } from '@backend/core/enums/coupon-code.enum';
import { CouponMapping } from '@backend/core/mappers/coupon-mapping';
import { BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeCouponId } from '@backend/core/ports/stripe-port.interface';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserPlanRepository: InMemoryUserPlanRepository;
let inMemoryMembershipRepository: InMemoryMembershipRepository;
let inMemoryCancellationRepository: InMemoryCancellationRepository;
let stripeAdapter: StripeAdapter;
let useCase: CancellationUseCase;
let stripe: Stripe;

beforeEach(() => {
  inMemoryUsersRepository = new InMemoryUsersRepository();
  inMemoryUserPlanRepository = new InMemoryUserPlanRepository();
  inMemoryMembershipRepository = new InMemoryMembershipRepository();
  inMemoryCancellationRepository = new InMemoryCancellationRepository();

  stripe = new Stripe(process.env.STRIPE_KEY_DEV as string);
  stripeAdapter = new StripeAdapter(stripe);

  useCase = new CancellationUseCase(
    inMemoryUsersRepository,
    inMemoryUserPlanRepository,
    inMemoryMembershipRepository,
    inMemoryCancellationRepository,
    stripeAdapter,
  );
});

describe('CancellationUseCase - Apply Coupon', () => {
  const userData: User = User.create({
    userId: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    countryCode: 'US',
    examId: 123,
    examYear: 2022,
    createdOn: new Date(),
    updatedOn: new Date(),
  });

  const userPlanData: UserPlan = UserPlan.create({
    userPlanId: 1,
    userId: 1,
    membershipId: 1,
    membershipStartDate: new Date(),
    membershipExpiryDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1),
    ),
    membershipCancelledDate: null,
    txnId: 'txn_123',
    subscriptionId: 'sub_1PSiqIDRZZ4zogeo6Hs4LSfv',
    createdOn: new Date(),
    updatedOn: new Date(),
    status: 'active',
    billingService: 'stripe',
    rvtStatus: 1,
  });

  const membershipData: Membership = Membership.create(
    {
      membershipId: 1,
      membershipType: 1,
      planName: 'Basic Plan',
      stripeId: 'price_1Nn7oaDRZZ4zogeoWIoQW4Jv',
      appleId: 'apple_123',
      userAccess: 5,
      period: 'monthly',
      price: '9.99',
      description: 'Basic membership plan with limited access.',
      isPopular: 0,
      trialPeriod: '7 days',
      status: 1,
      orderBy: 1,
      createdBy: 1,
      updatedBy: 1,
      createdOn: new Date(),
      updatedOn: new Date(),
      stripePaymentLink: 'https://stripe.com/pay/123',
      isProduction: 0,
    },
    new UniqueEntityID(1),
  );

  it('should apply a coupon code when isCancelling is false', async () => {
    await inMemoryUsersRepository.create(userData);
    inMemoryUserPlanRepository.items.push(userPlanData);
    inMemoryMembershipRepository.items.push(membershipData);

    const cancellationData = {};

    vi.spyOn(CouponMapping, 'isValidCouponCode').mockReturnValue(true);
    vi.spyOn(CouponMapping, 'getCouponId').mockReturnValue(
      StripeCouponId.FIFTYOFF,
    );

    const customer = await stripe.customers.create({
      email: userData.email,
      name: userData.name,
    });

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: 'tok_visa',
      },
    });

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customer.id,
    });

    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: 'price_1Nn7oaDRZZ4zogeoWIoQW4Jv' }],
    });

    userPlanData.subscriptionId = subscription.id;

    await inMemoryUserPlanRepository.update(userData.userId, userPlanData);

    const response = await useCase.execute(
      userData.userId,
      cancellationData,
      CouponCode.FIFTYOFF,
      'Discount',
      false,
    );

    expect(response).not.toBeNull();
    expect(response.isRight()).toBe(true);
    expect(response.value.status).toEqual('active');
  }, 20000); // Timeout extended to 15 seconds for Stripe operations

  it('should return an error if an invalid coupon code is provided', async () => {
    await inMemoryUsersRepository.create(userData);
    inMemoryUserPlanRepository.items.push(userPlanData);
    inMemoryMembershipRepository.items.push(membershipData);

    const cancellationData = {};

    vi.spyOn(CouponMapping, 'isValidCouponCode').mockReturnValue(false);

    const response = await useCase.execute(
      userData.userId,
      cancellationData,
      'invalid_coupon',
      'Discount',
      false,
    );

    expect(response).not.toBeNull();
    expect(response.isLeft()).toBe(true);
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(BadRequestException);
      expect(response.value.message).toBe('Invalid coupon name');
    }
  });
});
