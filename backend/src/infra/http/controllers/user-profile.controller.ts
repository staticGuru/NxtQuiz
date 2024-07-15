import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Req,
} from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserProfileResponseDto } from '../dtos/user-profile-response-dto';
import { LoadUserProfileUseCase } from '@backend/domain/user/use-cases/load-user-profile-use-case';
import { UpdateUserProfileUseCase } from '@backend/domain/user/use-cases/update-user-profile-use-case';
import { UpdateUserExamYearUseCase } from '@backend/domain/user/use-cases/update-user-exam-year-use-case';
import { UpdateUserProfileDto } from '../dtos/user-profile-update-dto';
import { UserId } from '@backend/infra/auth/decorators/user-id.decorator';
import { UpdateUserExamYearDto } from '../dtos/user-exam-year-update-dto';
import { MixpanelAdapter } from '@backend/infra/adapters/mixpanel/mixpanel-adapter';
import { CustomRequest } from '@backend/core/ports/event-tracking-port.interface';

@Controller('/api/user-profile')
@ApiCookieAuth('ci_session')
@ApiTags('User Profile')
export class UserProfileController {
  constructor(
    private readonly loadUserProfileUseCase: LoadUserProfileUseCase,
    private readonly updateUserProfileUseCase: UpdateUserProfileUseCase,
    private readonly updateUserExamYearUseCase: UpdateUserExamYearUseCase,
    private readonly mixpanelAdapter: MixpanelAdapter,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get User Data',
    type: UserProfileResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handleGet(@UserId() userId: number): Promise<UserProfileResponseDto> {
    const result = await this.loadUserProfileUseCase.execute({ userId });
    if (result.isLeft()) {
      throw new BadRequestException();
    }
    if (!result.value.user) {
      throw new Error('User not found');
    }
    return UserProfileResponseDto.toDto(result.value.user);
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'Update User Profile Data',
    type: UserProfileResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async handleUpdate(
    @UserId() userId: number,
    @Body() updateUserDto: UpdateUserProfileDto,
    @Req() request: CustomRequest,
  ): Promise<UserProfileResponseDto> {
    const result = await this.updateUserProfileUseCase.execute({
      userId,
      name: updateUserDto.name,
      email: updateUserDto.email,
      countryCode: updateUserDto.countryCode,
      examId: updateUserDto.examId,
      examYear: updateUserDto.examYear,
    });

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    if (!result.value) {
      throw new Error('User not found');
    }

    // Dispatch event to Mixpanel
    this.mixpanelAdapter.trackEvent('User Profile Updated', request, userId);

    return UserProfileResponseDto.toDto(result.value.user);
  }

  @Put('/exam-year')
  @ApiResponse({
    status: 200,
    description: 'Update User Exam Year',
    type: UpdateUserExamYearDto,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async handleUpdateExamYear(
    @UserId() userId: number,
    @Body() updateUserDto: UpdateUserExamYearDto,
  ): Promise<UserProfileResponseDto> {
    const result = await this.updateUserExamYearUseCase.execute({
      userId,
      examYear: updateUserDto.examYear,
    });

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    if (!result.value) {
      throw new Error('User not found');
    }
    return UserProfileResponseDto.toDto(result.value.user);
  }
}
