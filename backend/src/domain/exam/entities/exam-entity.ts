import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface ExamProps {
  examId: number;
  examName: string;
  examDescription: string;
  createdBy?: number;
  createdOn: Date;
  updatedBy?: number;
  updatedOn: Date;
  countryCode: string;
  status: number;
  examSlug: string;
  startDate: Date;
  endDate: Date;
}

export class Exam extends Entity<ExamProps> {
  get examName() {
    return this.props.examName;
  }

  get examId() {
    return this.props.examId;
  }

  get examDescription() {
    return this.props.examDescription;
  }

  get createdBy() {
    return this.props.createdBy;
  }

  get createdOn() {
    return this.props.createdOn;
  }

  get updatedBy() {
    return this.props.updatedBy;
  }

  get updatedOn() {
    return this.props.updatedOn;
  }

  get countryCode() {
    return this.props.countryCode;
  }

  get status() {
    return this.props.status;
  }

  get examSlug() {
    return this.props.examSlug;
  }

  get startDate() {
    return this.props.startDate;
  }

  get endDate() {
    return this.props.endDate;
  }

  set examId(examId: number) {
    this.props.examId = examId;
    this.touch();
  }

  set examName(examName: string) {
    this.props.examName = examName;
    this.touch();
  }

  set examDescription(examDescription: string) {
    this.props.examDescription = examDescription;
    this.touch();
  }

  set createdBy(createdBy: number | undefined) {
    this.props.createdBy = createdBy;
    this.touch();
  }

  set createdOn(createdOn: Date) {
    this.props.createdOn = createdOn;
    this.touch();
  }

  set updatedBy(updatedBy: number | undefined) {
    this.props.updatedBy = updatedBy;
    this.touch();
  }

  set updatedOn(updatedOn: Date) {
    this.props.updatedOn = updatedOn;
    this.touch();
  }

  set countryCode(countryCode: string) {
    this.props.countryCode = countryCode;
    this.touch();
  }

  set status(status: number) {
    this.props.status = status;
    this.touch();
  }

  set examSlug(examSlug: string) {
    this.props.examSlug = examSlug;
    this.touch();
  }

  set startDate(startDate: Date) {
    this.props.startDate = startDate;
    this.touch();
  }

  set endDate(endDate: Date) {
    this.props.endDate = endDate;
    this.touch();
  }

  static create(props: ExamProps, id?: UniqueEntityID) {
    return new Exam(
      {
        ...props,
      },
      id,
    );
  }

  private touch() {
    this.props.updatedOn = new Date();
  }
}
