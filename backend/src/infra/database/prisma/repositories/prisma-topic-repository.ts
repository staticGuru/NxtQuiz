import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Topic } from '@backend/domain/topic/entities/topic-entity';
import { PrismaTopicMapper } from '../mappers/prisma-topic-mapper';
import { TopicRepository } from '@backend/domain/topic/repositories/topic-repository';

@Injectable()
export class PrismaTopicRepository implements TopicRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: number): Promise<Topic | null> {
    const topic = await this.prisma.topic.findUnique({
      where: {
        topic_id: id,
      },
    });

    if (!topic) {
      return null;
    }

    return PrismaTopicMapper.toDomain(topic);
  }
}
