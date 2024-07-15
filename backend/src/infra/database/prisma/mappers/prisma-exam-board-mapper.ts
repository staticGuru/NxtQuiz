import { exam_board as PrismaExamBoard, Prisma } from '@prisma/client';
import { ExamBoard } from '@backend/domain/exam-board/entities/exam-board-entity';

export class PrismaExamBoardMapper {
  static toDomain(raw: PrismaExamBoard): ExamBoard {
    return ExamBoard.create({
      examBoardName: raw.exam_board_name,
      examBoardDescription: raw.exam_board_description,
      examBoardImageUrl: raw.exam_board_image_url,
      createdBy: raw.created_by ?? undefined,
      createdOn: raw.created_on ?? undefined,
      updatedBy: raw.updated_by ?? undefined,
      updatedOn: raw.updated_on ?? undefined,
      isSupported: raw.is_supported,
      examBoardSlug: raw.exam_board_slug,
    });
  }

  static toPrisma(examBoard: ExamBoard): Prisma.exam_boardUncheckedCreateInput {
    return {
      exam_board_name: examBoard.examBoardName,
      exam_board_description: examBoard.examBoardDescription,
      exam_board_image_url: examBoard.examBoardImageUrl,
      created_by: examBoard.createdBy,
      created_on: examBoard.createdOn,
      updated_by: examBoard.updatedBy,
      updated_on: examBoard.updatedOn,
      is_supported: examBoard.isSupported,
      exam_board_slug: examBoard.examBoardSlug,
    };
  }
}
