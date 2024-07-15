import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface UserStreakProps {
  userId: number;
  count: number;
  createdOn?: Date;
  updatedOn?: Date;
}

export class UserStreak extends Entity<UserStreakProps> {
  get userId() {
    return this.props.userId;
  }

  get count() {
    return this.props.count;
  }

  get createdOn() {
    return this.props.createdOn!;
  }

  get updatedOn() {
    return this.props.updatedOn!;
  }

  set userId(userId: number) {
    this.props.userId = userId;
  }

  set count(count: number) {
    this.props.count = count;
  }

  set createdOn(createdOn: Date) {
    this.props.createdOn = createdOn;
  }

  set updatedOn(updatedOn: Date) {
    this.props.updatedOn = updatedOn;
  }

  static create(props: UserStreakProps, id?: UniqueEntityID) {
    const userStreak = new UserStreak(
      {
        ...props,
        createdOn: props.createdOn ?? new Date(),
        updatedOn: props.updatedOn ?? new Date(),
      },
      id,
    );

    return userStreak;
  }
}
