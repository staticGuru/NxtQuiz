import {
  Controller,
  BadRequestException,
  Put,
  Body,
  Req,
} from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from '@backend/infra/auth/decorators/user-id.decorator';
import { CancellationUseCase } from '@backend/domain/cancellation-flow/use-cases/cancellation-use-case';
import { UpdateUserSubscriptionDto } from '@backend/infra/http/dtos/user-subscription-update-dto';
import { MixpanelAdapter } from '@backend/infra/adapters/mixpanel/mixpanel-adapter';
import { CustomRequest } from '@backend/core/ports/event-tracking-port.interface';
import { EventTrackingMessages } from '@backend/core/enums/event-tracking-messages.enum';

@Controller('/api/cancellation-flow')
@ApiCookieAuth('ci_session')
@ApiTags('Cancellation Flow')
export class CancellationController {
  constructor(
    private readonly cancellationUseCase: CancellationUseCase,
    private readonly mixpanelAdapter: MixpanelAdapter,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Update subscription',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Put()
  async updateSubscription(
    @UserId() userId: number,
    @Body() userSubscriptionUpdateDto: UpdateUserSubscriptionDto,
    @Req() request: CustomRequest,
  ): Promise<void> {
    const {
      couponName,
      cancellationData,
      cancellationDataString,
      cancellationStatus,
      isCancelling,
    } = userSubscriptionUpdateDto;

    const result = await this.cancellationUseCase.execute(
      userId,
      cancellationData,
      couponName,
      cancellationStatus,
      isCancelling,
    );

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }

    // Add couponName and cancellationStatus to cancellationDataString
    if (cancellationDataString) {
      cancellationDataString.couponName = couponName;
      cancellationDataString.cancellationStatus = cancellationStatus;
    }

    // Mixpanel tracking
    await this.mixpanelAdapter.trackEvent(
      EventTrackingMessages.PLAN_CANCELLED,
      request,
      userId,
      cancellationDataString,
    );
  }
}
