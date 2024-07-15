import {
  BadRequestException,
  Controller,
  Get,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExamListUseCase } from '@backend/domain/exam/use-cases/exam-list-use-case';
import { ExamResponseDto } from '@backend/infra/http/dtos/exam-response-dto';
import { ExamRequestDto } from '@backend/infra/http/dtos/exam-request-dto';

@Controller('/api/exam')
@ApiCookieAuth('ci_session')
@ApiTags('Exam')
export class ExamController {
  constructor(private readonly examListUseCase: ExamListUseCase) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of exams',
    type: [ExamResponseDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handleGet(@Query() query: ExamRequestDto): Promise<ExamResponseDto[]> {
    try {
      const { countryCode } = query;
      const result = await this.examListUseCase.execute(countryCode);
      if (result.isLeft()) {
        throw new BadRequestException('Resource not found');
      }
      if (!result.value.exams) {
        throw new Error('Exams not found');
      }
      return result.value.exams.map(ExamResponseDto.toDto);
    } catch (error) {
      console.error('Error fetching exams:', error);
      throw new InternalServerErrorException('Could not fetch exams');
    }
  }
}
