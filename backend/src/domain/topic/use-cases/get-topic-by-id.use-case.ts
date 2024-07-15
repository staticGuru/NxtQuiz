import { Either, left, right } from '@backend/core/either';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@backend/core/errors/errors/resource-not-found-error';
import { TopicRepository } from '../repositories/topic-repository';
import { Topic } from '../entities/topic-entity';

type GetTopicByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    topic: Topic;
  }
>;

@Injectable()
export class GetTopicByIdUseCase {
  constructor(private topicRepository: TopicRepository) {}

  async execute(id: number): Promise<GetTopicByIdUseCaseResponse> {
    const topic = await this.topicRepository.getById(id);

    if (!topic) {
      return left(new ResourceNotFoundError());
    }

    return right({
      topic,
    });
  }
}
