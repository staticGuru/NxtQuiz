import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExamYearListUseCase } from '@backend/domain/exam/use-cases/exam-year-list-use-case';
import { ExamYearDetailUseCase } from '@backend/domain/exam/use-cases/exam-year-detail-use-case';
import { ExamYearResponseDto } from '@backend/infra/http/dtos/exam-year-response-dto';
import { ExamYearRequestDto } from '@backend/infra/http/dtos/exam-year-request-dto';

@Controller('/api/exam-year')
@ApiCookieAuth('ci_session')
@ApiTags('ExamYear')
export class ExamYearController {
  constructor(
    private readonly examYearListUseCase: ExamYearListUseCase,
    private readonly examYearDetailUseCase: ExamYearDetailUseCase,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of exam years',
    type: [ExamYearResponseDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handleGet(
    @Query() query: ExamYearRequestDto,
  ): Promise<ExamYearResponseDto[]> {
    const { examId } = query;
    const result = await this.examYearListUseCase.execute(examId);
    if (result.isLeft()) {
      throw new BadRequestException();
    }
    if (!result.value.examYears) {
      throw new Error('Exam years not found');
    }
    return result.value.examYears.map(ExamYearResponseDto.toDto);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get exam year by id',
    type: ExamYearResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handleGetById(
    @Param('id') examYearId: number,
  ): Promise<ExamYearResponseDto> {
    const result = await this.examYearDetailUseCase.execute(examYearId);
    if (result.isLeft()) {
      throw new BadRequestException();
    }
    if (!result.value.examYear) {
      throw new Error('Exam year not found');
    }
    return ExamYearResponseDto.toDto(result.value.examYear);
  }
}
