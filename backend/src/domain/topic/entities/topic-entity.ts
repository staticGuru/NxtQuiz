import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface TopicProps {
  examId: number;
  subjectId: number;
  levelId: number;
  topicTitle?: string;
  icon?: string;
  iconType: number;
  orderBy: number;
  createdBy?: number;
  createdOn: Date;
  updatedBy?: number;
  updatedOn: Date;
  topicSlug: string;
  unitId?: number;
}

export class Topic extends Entity<TopicProps> {
  get topicId() {
    return this.id;
  }

  get examId() {
    return this.props.examId;
  }

  get subjectId() {
    return this.props.subjectId;
  }

  get levelId() {
    return this.props.levelId;
  }

  get topicTitle() {
    return this.props.topicTitle;
  }

  get icon() {
    return this.props.icon;
  }

  get iconType() {
    return this.props.iconType;
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

  get topicSlug() {
    return this.props.topicSlug;
  }

  get unitId() {
    return this.props.unitId;
  }

  static create(props: TopicProps, id?: UniqueEntityID) {
    const topic = new Topic(props, id);
    return topic;
  }
}
