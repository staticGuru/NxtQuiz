import { Note } from '@backend/domain/note/entities/note-entity';
import { ApiProperty } from '@nestjs/swagger';

export class NoteResponseDto {
  @ApiProperty()
  noteId: number;

  @ApiProperty()
  noteType: number;

  @ApiProperty()
  noteTitle: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  createdOn: Date;

  @ApiProperty()
  updatedOn: Date | null | undefined;

  public static toDto(note: Note): NoteResponseDto {
    return {
      noteId: note.noteId ?? 0,
      noteTitle: note.noteTitle,
      noteType: note.noteType,
      note: note.note,
      createdOn: note.createdOn,
      updatedOn: note.updatedOn,
    };
  }
}
