// exam-board-entity.ts
import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface ExamBoardProps {
  examBoardName: string;
  examBoardDescription: string;
  examBoardImageUrl: string;
  createdBy?: number;
  createdOn?: Date;
  updatedBy?: number;
  updatedOn?: Date;
  isSupported: number;
  examBoardSlug: string;
}

export class ExamBoard extends Entity<ExamBoardProps> {
  get id(): UniqueEntityID {
    return this.id;
  }

  get examBoardName(): string {
    return this.props.examBoardName;
  }

  get examBoardDescription(): string {
    return this.props.examBoardDescription;
  }

  get examBoardImageUrl(): string {
    return this.props.examBoardImageUrl;
  }

  get createdBy(): number | undefined {
    return this.props.createdBy;
  }

  get createdOn(): Date | undefined {
    return this.props.createdOn;
  }

  get updatedBy(): number | undefined {
    return this.props.updatedBy;
  }

  get updatedOn(): Date | undefined {
    return this.props.updatedOn;
  }

  get isSupported(): number {
    return this.props.isSupported;
  }

  get examBoardSlug(): string {
    return this.props.examBoardSlug;
  }

  set examBoardName(examBoardName: string) {
    this.props.examBoardName = examBoardName;
  }

  set examBoardDescription(examBoardDescription: string) {
    this.props.examBoardDescription = examBoardDescription;
  }

  set examBoardImageUrl(examBoardImageUrl: string) {
    this.props.examBoardImageUrl = examBoardImageUrl;
  }

  set createdBy(createdBy: number | undefined) {
    this.props.createdBy = createdBy;
  }

  set createdOn(createdOn: Date | undefined) {
    this.props.createdOn = createdOn;
  }

  set updatedBy(updatedBy: number | undefined) {
    this.props.updatedBy = updatedBy;
  }

  set updatedOn(updatedOn: Date | undefined) {
    this.props.updatedOn = updatedOn;
  }

  set isSupported(isSupported: number) {
    this.props.isSupported = isSupported;
  }

  set examBoardSlug(examBoardSlug: string) {
    this.props.examBoardSlug = examBoardSlug;
  }

  static create(props: ExamBoardProps, id?: UniqueEntityID): ExamBoard {
    const examBoard = new ExamBoard(
      {
        ...props,
      },
      id,
    );

    return examBoard;
  }
}
