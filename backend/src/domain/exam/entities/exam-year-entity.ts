import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface ExamYearProps {
  examYearId: number;
  examYearTitle: string;
  examId: number;
  isBeforeUniversity: boolean;
  examYearIcon: string;
  examStartDate: Date;
  examEndDate: Date;
}

export class ExamYear extends Entity<ExamYearProps> {
  get examYearId() {
    return this.props.examYearId;
  }

  get examYearTitle() {
    return this.props.examYearTitle;
  }

  get examId() {
    return this.props.examId;
  }

  get isBeforeUniversity() {
    return this.props.isBeforeUniversity;
  }

  get examYearIcon() {
    return this.props.examYearIcon;
  }

  get examStartDate() {
    return this.props.examStartDate;
  }

  get examEndDate() {
    return this.props.examEndDate;
  }

  set examYearId(examYearId: number) {
    this.props.examYearId = examYearId;
  }

  set examYearTitle(examYearTitle: string) {
    this.props.examYearTitle = examYearTitle;
  }

  set examId(examId: number) {
    this.props.examId = examId;
  }

  set isBeforeUniversity(isBeforeUniversity: boolean) {
    this.props.isBeforeUniversity = isBeforeUniversity;
  }

  set examYearIcon(examYearIcon: string) {
    this.props.examYearIcon = examYearIcon;
  }

  set examStartDate(examStartDate: Date) {
    this.props.examStartDate = examStartDate;
  }

  set examEndDate(examEndDate: Date) {
    this.props.examEndDate = examEndDate;
  }

  static create(props: ExamYearProps, id?: UniqueEntityID) {
    const examYear = new ExamYear(
      {
        ...props,
      },
      id,
    );

    return examYear;
  }
}
