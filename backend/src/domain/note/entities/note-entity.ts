import { Optional } from '@backend/core/types/optional';
import dayjs from 'dayjs';
import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface NotesProps {
  noteId?: number;
  examId: number;
  subjectId: number;
  topicId: number;
  subTopicId?: number;
  levelId: number;
  noteType: number;
  noteTitle: string;
  icon?: string | null;
  iconType?: number;
  note: string;
  shortNote: string;
  screenshot?: string;
  isFree: number;
  status?: number;
  orderBy?: number;
  createdBy?: number | null;
  createdOn: Date;
  updatedBy?: number | null;
  updatedOn?: Date | null;
  onProduction?: number;
  onStaging?: number;
  sourceUrl?: string;
}

type NoteCreateProps = Optional<
  NotesProps,
  | 'noteId'
  | 'icon'
  | 'iconType'
  | 'screenshot'
  | 'status'
  | 'orderBy'
  | 'createdBy'
  | 'updatedBy'
  | 'updatedOn'
  | 'onProduction'
  | 'onStaging'
  | 'createdOn'
  | 'sourceUrl'
>;

export class Note extends Entity<NotesProps> {
  get noteId() {
    return this.props.noteId;
  }

  get examId() {
    return this.props.examId;
  }

  get subjectId() {
    return this.props.subjectId;
  }

  get topicId() {
    return this.props.topicId;
  }

  get subTopicId() {
    return this.props.subTopicId;
  }

  get levelId() {
    return this.props.levelId;
  }

  get noteType() {
    return this.props.noteType;
  }

  get noteTitle() {
    return this.props.noteTitle;
  }

  get icon() {
    return this.props.icon;
  }

  get iconType() {
    return this.props.iconType;
  }

  get note() {
    return this.props.note;
  }

  get shortNote() {
    return this.props.shortNote;
  }

  get screenshot() {
    return this.props.screenshot;
  }

  get isFree() {
    return this.props.isFree;
  }

  get status() {
    return this.props.status;
  }

  get orderBy() {
    return this.props.orderBy;
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

  get onProduction() {
    return this.props.onProduction;
  }

  get onStaging() {
    return this.props.onStaging;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdOn, 'days') <= 3;
  }

  get sourceUrl() {
    return this.props.sourceUrl;
  }

  set noteId(value: number | undefined) {
    this.props.noteId = value;
  }

  set examId(value: number) {
    this.props.examId = value;
  }

  set subjectId(value: number) {
    this.props.subjectId = value;
  }

  set topicId(value: number) {
    this.props.topicId = value;
  }

  set subTopicId(value: number | undefined) {
    this.props.subTopicId = value;
  }

  set levelId(value: number) {
    this.props.levelId = value;
  }

  set noteType(value: number) {
    this.props.noteType = value;
  }

  set noteTitle(value: string) {
    this.props.noteTitle = value;
  }

  set icon(value: string | null | undefined) {
    this.props.icon = value;
  }

  set iconType(value: number | undefined) {
    this.props.iconType = value;
  }

  set note(value: string) {
    this.props.note = value;
  }

  set shortNote(value: string) {
    this.props.shortNote = value;
  }

  set screenshot(value: string | undefined) {
    this.props.screenshot = value;
  }

  set isFree(value: number) {
    this.props.isFree = value;
  }

  set status(value: number | undefined) {
    this.props.status = value;
  }

  set orderBy(value: number | undefined) {
    this.props.orderBy = value;
  }

  set createdBy(value: number | null | undefined) {
    this.props.createdBy = value;
  }

  set createdOn(value: Date) {
    this.props.createdOn = value;
  }

  set updatedBy(value: number | null | undefined) {
    this.props.updatedBy = value;
  }

  set updatedOn(value: Date | null | undefined) {
    this.props.updatedOn = value;
  }

  set onProduction(value: number | undefined) {
    this.props.onProduction = value;
  }

  set onStaging(value: number | undefined) {
    this.props.onStaging = value;
  }

  set sourceUrl(value: string | undefined) {
    this.props.sourceUrl = value;
  }

  private touch() {
    this.props.updatedOn = new Date();
  }

  static create(props: NoteCreateProps, id?: UniqueEntityID) {
    const note = new Note(
      {
        ...props,
        createdOn: props.createdOn ?? new Date(),
        icon: props.icon ?? null,
        iconType: props.iconType ?? 0,
        screenshot: props.screenshot ?? '',
        status: props.status ?? 0,
        orderBy: props.orderBy ?? 0,
        createdBy: props.createdBy ?? null,
        updatedBy: props.updatedBy ?? null,
        updatedOn: props.updatedOn ?? null,
        onProduction: props.onProduction ?? 0,
        onStaging: props.onStaging ?? 0,
      },
      id,
    );

    return note;
  }
}
