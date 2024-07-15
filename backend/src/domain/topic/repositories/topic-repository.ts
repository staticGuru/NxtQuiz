import { Topic } from '../entities/topic-entity';

export abstract class TopicRepository {
  abstract getById(id: number): Promise<Topic | null>;
}
