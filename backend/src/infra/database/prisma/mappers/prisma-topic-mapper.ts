import { topic as PrismaTopic, Prisma } from '@prisma/client';
import { Topic } from '@backend/domain/topic/entities/topic-entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export class PrismaTopicMapper {
  static toDomain(raw: PrismaTopic): Topic {
    return Topic.create(
      {
        examId: raw.exam_id,
        subjectId: raw.subject_id,
        levelId: raw.level_id,
        topicTitle: raw.topic_title as string,
        icon: raw.icon as string,
        iconType: raw.icon_type,
        orderBy: raw.order_by,
        createdBy: raw.created_by || undefined,
        createdOn: raw.created_on,
        updatedBy: raw.updated_by || undefined,
        updatedOn: raw.updated_on,
        topicSlug: raw.topic_slug,
        unitId: raw.unit_id || undefined,
      },
      new UniqueEntityID(raw.topic_id),
    );
  }

  static toPrisma(topic: Topic): Prisma.topicUncheckedCreateInput {
    return {
      exam_id: topic.examId,
      subject_id: topic.subjectId,
      level_id: topic.levelId,
      topic_title: topic.topicTitle,
      icon: topic.icon,
      icon_type: topic.iconType,
      order_by: topic.orderBy,
      created_by: topic.createdBy,
      created_on: topic.createdOn,
      updated_by: topic.updatedBy,
      updated_on: topic.updatedOn,
      topic_slug: topic.topicSlug,
      unit_id: topic.unitId,
    };
  }
}
