import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface CancellationReasonProps {
  cancellationReasonId: number;
  cancellationReasonName: string;
  cancellationReasonIcon: string;
}

export class CancellationReason extends Entity<CancellationReasonProps> {
  get cancellationReasonId() {
    return this.props.cancellationReasonId;
  }

  get cancellationReasonName() {
    return this.props.cancellationReasonName;
  }

  get cancellationReasonIcon() {
    return this.props.cancellationReasonIcon;
  }

  set cancellationReasonId(cancellationReasonId: number) {
    this.props.cancellationReasonId = cancellationReasonId;
  }

  set cancellationReasonName(cancellationReasonName: string) {
    this.props.cancellationReasonName = cancellationReasonName;
  }

  set cancellationReasonIcon(cancellationReasonIcon: string) {
    this.props.cancellationReasonIcon = cancellationReasonIcon;
  }

  static create(props: CancellationReasonProps, id?: UniqueEntityID) {
    const cancellationReason = new CancellationReason(
      {
        ...props,
      },
      id,
    );

    return cancellationReason;
  }
}
