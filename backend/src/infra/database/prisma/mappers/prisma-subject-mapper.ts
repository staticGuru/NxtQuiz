import {
  subject as PrismaSubject,
  exam_board as PrismaExamBoard,
} from '@prisma/client';
import { Subject } from '@backend/domain/subject/entities/subject-entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';
import { PrismaExamBoardMapper } from './prisma-exam-board-mapper';

type ExtendedPrismaSubject = PrismaSubject & {
  exam_board?: PrismaExamBoard;
};
export class PrismaSubjectMapper {
  static toDomain(raw: ExtendedPrismaSubject): Subject {
    return Subject.create(
      {
        examId: raw.exam_id,
        subjectTitle: raw.subject_title,
        icon: raw.icon,
        subjectColor: raw.subject_color,
        isShow: raw.is_show,
        iconType: raw.icon_type,
        orderBy: raw.order_by,
        status: raw.status,
        createdBy: raw.created_by,
        createdOn: raw.created_on,
        updatedBy: raw.updated_by,
        updatedOn: raw.updated_on,
        examBoardId: raw.exam_board_id,
        subjectSlug: raw.subject_slug,
        examBoard: raw.exam_board
          ? PrismaExamBoardMapper.toDomain(raw.exam_board)
          : undefined,
      },
      new UniqueEntityID(raw.subject_id),
    );
  }

  static toPrisma(subject: Subject): PrismaSubject {
    return {
      subject_id: Number(subject.subjectId),
      exam_id: subject.examId,
      subject_title: subject.subjectTitle,
      icon: subject.icon,
      subject_color: subject.subjectColor,
      is_show: subject.isShow,
      icon_type: subject.iconType,
      order_by: subject.orderBy,
      status: subject.status,
      created_by: subject.createdBy,
      created_on: subject.createdOn,
      updated_by: subject.updatedBy,
      updated_on: subject.updatedOn,
      exam_board_id: subject.examBoardId,
      subject_slug: subject.subjectSlug,
    };
  }
}
