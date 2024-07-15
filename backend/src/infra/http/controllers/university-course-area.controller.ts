import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UniversityCourseAreaListUseCase } from '@backend/domain/university-course-area/use-cases/university-course-area-list-use-case';
import { UniversityCourseAreaResponseDto } from '@backend/infra/http/dtos/university-course-area-response-dto';

@Controller('/api/university-course-area')
@ApiCookieAuth('ci_session')
@ApiTags('UniversityCourseArea')
export class UniversityCourseAreaController {
  constructor(
    private readonly universityCourseAreaListUseCase: UniversityCourseAreaListUseCase,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of university course areas',
    type: UniversityCourseAreaResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handleGet(): Promise<UniversityCourseAreaResponseDto[]> {
    const result = await this.universityCourseAreaListUseCase.execute();
    if (result.isLeft()) {
      throw new BadRequestException();
    }
    if (!result.value.universityCourseAreas) {
      throw new Error('University course areas not found');
    }
    return result.value.universityCourseAreas.map(
      UniversityCourseAreaResponseDto.toDto,
    );
  }
}
