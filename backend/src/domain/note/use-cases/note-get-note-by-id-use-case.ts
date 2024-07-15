import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { NoteRepository } from '../repositories/note-repository';
import { Note } from '../entities/note-entity';

type GetNoteByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    note: Note;
  }
>;

@Injectable()
export class NoteByIdGetUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: number): Promise<GetNoteByIdUseCaseResponse> {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      return left(new ResourceNotFoundError());
    }

    return right({ note });
  }
}
