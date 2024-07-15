import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from '@backend/infra/auth/decorators/user-id.decorator';
import { MixpanelAdapter } from '@backend/infra/adapters/mixpanel/mixpanel-adapter';
import { CustomRequest } from '@backend/core/ports/event-tracking-port.interface';
import { MixpanelRequestDto } from '../dtos/mixpanel-request-dto';

@ApiCookieAuth('ci_session')
@ApiTags('Mixpanel')
@Controller('/api/mixpanel')
export class MixpanelController {
  constructor(private readonly mixpanelAdapter: MixpanelAdapter) {}

  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Track event on Mixpanel.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  handleMixpanelEvent(
    @UserId() userId: number,
    @Body() body: MixpanelRequestDto,
    @Req() request: CustomRequest,
  ) {
    this.mixpanelAdapter.trackEvent(body.eventName, request, userId);
  }
}
