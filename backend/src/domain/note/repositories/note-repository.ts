import { Note } from '@backend/domain/note/entities/note-entity';

export abstract class NoteRepository {
  abstract findById(id: number): Promise<Note | null>;
  abstract create(note: Note): Promise<Note>;
  abstract save(note: Note): Promise<Note>;
}
