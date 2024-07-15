import { ApiProperty } from '@nestjs/swagger';

export class UserSubscriptionResponseDto {
  @ApiProperty()
  subscriptionId: string;

  @ApiProperty()
  stripeId: string;

  @ApiProperty()
  couponId?: string;

  public static toDto(data: {
    subscriptionId: string;
    stripeId: string;
    couponId?: string;
  }): UserSubscriptionResponseDto {
    return {
      subscriptionId: data.subscriptionId,
      stripeId: data.stripeId,
      couponId: data.couponId ?? '',
    };
  }
}
