import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EducationLevelListUseCase } from '@backend/domain/education-level/use-cases/education-level-list-use-case';
import { EducationLevelResponseDto } from '@backend/infra/http/dtos/education-level-response-dto';

@Controller('/api/education-level')
@ApiCookieAuth('ci_session')
@ApiTags('EducationLevel')
export class EducationLevelController {
  constructor(
    private readonly educationLevelListUseCase: EducationLevelListUseCase,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of education levels',
    type: EducationLevelResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handleGet(): Promise<EducationLevelResponseDto[]> {
    const result = await this.educationLevelListUseCase.execute();
    if (result.isLeft()) {
      throw new BadRequestException();
    }
    if (!result.value.educationLevels) {
      throw new Error('Education levels not found');
    }
    return result.value.educationLevels.map(EducationLevelResponseDto.toDto);
  }
}
