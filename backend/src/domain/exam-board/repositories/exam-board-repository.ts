import { ExamBoard } from '../entities/exam-board-entity';

export abstract class ExamBoardRepository {
  abstract list(): Promise<ExamBoard[]>;
  abstract getById(examBoardId: number): Promise<ExamBoard | null>;
}
