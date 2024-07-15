import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { ExamBoardRepository } from '../repositories/exam-board-repository';
import { ExamBoard } from '../entities/exam-board-entity';

type ListExamBoardsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    examBoards: ExamBoard[];
  }
>;

@Injectable()
export class ExamBoardListUseCase {
  constructor(private examBoardRepository: ExamBoardRepository) {}

  async execute(): Promise<ListExamBoardsUseCaseResponse> {
    const examBoards = await this.examBoardRepository.list();

    if (!examBoards) {
      return left(new ResourceNotFoundError());
    }

    return right({
      examBoards,
    });
  }
}
