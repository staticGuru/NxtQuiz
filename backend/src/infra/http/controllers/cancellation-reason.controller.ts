import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CancellationReasonListUseCase } from '@backend/domain/cancellation-flow/use-cases/cancellation-reason-list-use-case';
import { CancellationReasonResponseDto } from '@backend/infra/http/dtos/cancellation-reason-response-dto';

@Controller('/api/cancellation-reason')
@ApiCookieAuth('ci_session')
@ApiTags('CancellationReason')
export class CancellationReasonController {
  constructor(
    private readonly cancellationReasonListUseCase: CancellationReasonListUseCase,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of cancellation reasons',
    type: CancellationReasonResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handleGet(): Promise<CancellationReasonResponseDto[]> {
    const result = await this.cancellationReasonListUseCase.execute();
    if (result.isLeft()) {
      throw new BadRequestException();
    }
    if (!result.value.cancellationReasons) {
      throw new Error('Cancellation reasons not found');
    }
    return result.value.cancellationReasons.map(
      CancellationReasonResponseDto.toDto,
    );
  }
}
