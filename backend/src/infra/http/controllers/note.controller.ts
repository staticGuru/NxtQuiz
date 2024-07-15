import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoteResponseDto } from '../dtos/note-response-dto';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { NoteByIdGetUseCase } from '@backend/domain/note/use-cases/note-get-note-by-id-use-case';

@Controller('/api/note')
@ApiTags('note')
export class NoteController {
  constructor(private readonly getNoteByIdUseCase: NoteByIdGetUseCase) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a note by id',
    type: [NoteResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Resource not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getNoteById(@Param('id') id: number): Promise<NoteResponseDto> {
    const result = await this.getNoteByIdUseCase.execute(id);
    if (result.isLeft()) {
      throw new ResourceNotFoundError();
    }

    return NoteResponseDto.toDto(result.value.note);
  }
}
