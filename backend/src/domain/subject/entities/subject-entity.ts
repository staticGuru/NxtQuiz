import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';
import { ExamBoard } from '@backend/domain/exam-board/entities/exam-board-entity';

export interface SubjectProps {
  examId: number;
  subjectTitle: string;
  icon: string;
  subjectColor: string;
  isShow: number;
  iconType: number;
  orderBy: number;
  status: number;
  createdBy: number | null;
  createdOn: Date;
  updatedBy: number | null;
  updatedOn: Date;
  examBoardId: number | null;
  subjectSlug: string;
  examBoard?: ExamBoard;
}

export class Subject extends Entity<SubjectProps> {
  get subjectId(): UniqueEntityID {
    return this.id;
  }

  get examId(): number {
    return this.props.examId;
  }

  get subjectTitle(): string {
    return this.props.subjectTitle;
  }

  get icon(): string {
    return this.props.icon;
  }

  get subjectColor(): string {
    return this.props.subjectColor;
  }

  get isShow(): number {
    return this.props.isShow;
  }

  get iconType(): number {
    return this.props.iconType;
  }

  get orderBy(): number {
    return this.props.orderBy;
  }

  get status(): number {
    return this.props.status;
  }

  get createdBy(): number {
    return this.props.createdBy ?? 0; // Default value if undefined
  }

  get createdOn(): Date {
    return this.props.createdOn;
  }

  get updatedBy(): number {
    return this.props.updatedBy ?? 0; // Default value if undefined
  }

  get updatedOn(): Date {
    return this.props.updatedOn;
  }

  get examBoardId(): number {
    return this.props.examBoardId ?? 0; // Default value if undefined
  }

  get subjectSlug(): string {
    return this.props.subjectSlug;
  }

  get examBoard(): ExamBoard | undefined {
    return this.props.examBoard;
  }

  set examId(examId: number) {
    this.props.examId = examId;
  }

  set subjectTitle(subjectTitle: string) {
    this.props.subjectTitle = subjectTitle;
  }

  set icon(icon: string) {
    this.props.icon = icon;
  }

  set subjectColor(subjectColor: string) {
    this.props.subjectColor = subjectColor;
  }

  set isShow(isShow: number) {
    this.props.isShow = isShow;
  }

  set iconType(iconType: number) {
    this.props.iconType = iconType;
  }

  set orderBy(orderBy: number) {
    this.props.orderBy = orderBy;
  }

  set status(status: number) {
    this.props.status = status;
  }

  set createdBy(createdBy: number) {
    this.props.createdBy = createdBy;
  }

  set createdOn(createdOn: Date) {
    this.props.createdOn = createdOn;
  }

  set updatedBy(updatedBy: number) {
    this.props.updatedBy = updatedBy;
  }

  set updatedOn(updatedOn: Date) {
    this.props.updatedOn = updatedOn;
  }

  set examBoardId(examBoardId: number) {
    this.props.examBoardId = examBoardId;
  }

  set subjectSlug(subjectSlug: string) {
    this.props.subjectSlug = subjectSlug;
  }

  static create(props: SubjectProps, id?: UniqueEntityID): Subject {
    const subject = new Subject(
      {
        ...props,
      },
      id,
    );

    return subject;
  }
}
