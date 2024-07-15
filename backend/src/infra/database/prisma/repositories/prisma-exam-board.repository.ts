import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ExamBoardRepository } from '@backend/domain/exam-board/repositories/exam-board-repository';
import { ExamBoard } from '@backend/domain/exam-board/entities/exam-board-entity';
import { PrismaExamBoardMapper } from '../mappers/prisma-exam-board-mapper';

@Injectable()
export class PrismaExamBoardRepository implements ExamBoardRepository {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<ExamBoard[]> {
    const examBoards = await this.prisma.exam_board.findMany({
      where: {
        is_supported: 1,
      },
    });

    return examBoards.map(PrismaExamBoardMapper.toDomain);
  }

  async getById(examBoardId: number): Promise<ExamBoard | null> {
    const examBoard = await this.prisma.exam_board.findUnique({
      where: { exam_board_id: examBoardId },
    });

    if (!examBoard) {
      return null;
    }

    return PrismaExamBoardMapper.toDomain(examBoard);
  }
}
