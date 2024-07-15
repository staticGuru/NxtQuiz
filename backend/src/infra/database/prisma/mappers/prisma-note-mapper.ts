import { notes as PrismaNote, Prisma } from '@prisma/client';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';
import { Note } from '@backend/domain/note/entities/note-entity';

export class PrismaNoteMapper {
  static toDomain(raw: PrismaNote): Note {
    if (!raw.note_id) {
      throw new Error('Invalid note type.');
    }

    return Note.create(
      {
        noteId: raw.note_id,
        note: raw.note,
        examId: raw.exam_id,
        subjectId: raw.subject_id,
        topicId: raw.topic_id,
        subTopicId: raw.sub_topic_id ?? undefined,
        levelId: raw.level_id,
        noteType: raw.note_type,
        isFree: raw.is_free,
        iconType: raw.icon_type,
        icon: raw.icon,
        shortNote: raw.short_note,
        noteTitle: raw.note_title,
        screenshot: raw.screenshot,
        createdOn: new Date(raw.created_on),
        updatedOn: raw.updated_on ? new Date(raw.updated_on) : null,
        onProduction: raw.onProduction,
        onStaging: raw.onStaging,
        status: raw.status,
        orderBy: raw.order_by,
        createdBy: raw.created_by,
        updatedBy: raw.updated_by,
        sourceUrl: raw.source_url ?? undefined,
      },
      new UniqueEntityID(raw.note_id),
    );
  }

  static toPrisma(note: Note): Prisma.notesUncheckedCreateInput {
    return {
      note_id: note.noteId,
      note: note.note,
      exam_id: note.examId,
      subject_id: note.subjectId,
      topic_id: note.topicId,
      sub_topic_id: note.subTopicId,
      level_id: note.levelId,
      note_type: note.noteType,
      is_free: note.isFree,
      icon_type: note.iconType ?? 0,
      icon: note.icon ?? '',
      short_note: note.shortNote,
      note_title: note.noteTitle,
      screenshot: note.screenshot ?? '',
      created_on: new Date(note.createdOn),
      updated_on: note.updatedOn ? new Date(note.updatedOn) : undefined,
      onProduction: note.onProduction,
      onStaging: note.onStaging,
      status: note.status ?? 0,
      order_by: note.orderBy ?? 0,
      created_by: note.createdBy ?? 0,
      updated_by: note.updatedBy ?? 0,
      source_url: note.sourceUrl ?? '',
    };
  }
}
