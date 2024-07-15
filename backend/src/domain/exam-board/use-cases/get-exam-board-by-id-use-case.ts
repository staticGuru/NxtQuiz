import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { ExamBoardRepository } from '../repositories/exam-board-repository';
import { ExamBoard } from '../entities/exam-board-entity';

type GetExamBoardByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    examBoard: ExamBoard;
  }
>;

@Injectable()
export class GetExamBoardByIdUseCase {
  constructor(private examBoardRepository: ExamBoardRepository) {}

  async execute(examBoardId: number): Promise<GetExamBoardByIdUseCaseResponse> {
    const examBoard = await this.examBoardRepository.getById(examBoardId);

    if (!examBoard) {
      return left(new ResourceNotFoundError());
    }

    return right({
      examBoard,
    });
  }
}
