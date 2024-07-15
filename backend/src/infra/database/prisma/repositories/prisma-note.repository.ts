import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Note } from '@backend/domain/note/entities/note-entity';
import { NoteRepository } from '@backend/domain/note/repositories/note-repository';
import { PrismaNoteMapper } from '@backend/infra/database/prisma/mappers/prisma-note-mapper';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
  constructor(private prisma: PrismaService) {}

  async create(note: Note): Promise<Note> {
    const data = PrismaNoteMapper.toPrisma(note);
    const insertedNote = await this.prisma.notes.create({
      data,
    });
    return PrismaNoteMapper.toDomain(insertedNote);
  }

  async save(note: Note): Promise<Note> {
    if (!note.noteId) {
      throw new Error('Note ID is required.');
    }

    const data = PrismaNoteMapper.toPrisma(note);
    const updatedNote = await this.prisma.notes.update({
      where: { note_id: note.noteId },
      data,
    });
    return PrismaNoteMapper.toDomain(updatedNote);
  }

  async findById(id: number): Promise<Note | null> {
    const rawNote = await this.prisma.notes.findUnique({
      where: { note_id: id },
    });

    if (!rawNote) {
      return null;
    }

    return PrismaNoteMapper.toDomain(rawNote);
  }
}
