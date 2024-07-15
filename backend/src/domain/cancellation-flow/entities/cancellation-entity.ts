import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface CancellationProps {
  userId: number;
  educationLevelId: number;
  universityCourseAreaId: number;
  productImprovementId: number;
  productRatingId: number;
  cancellationReasonId: number;
  cancellationStatus: string;
}

export class Cancellation extends Entity<CancellationProps> {
  get userId() {
    return this.props.userId;
  }

  get educationLevelId() {
    return this.props.educationLevelId;
  }

  get universityCourseAreaId() {
    return this.props.universityCourseAreaId;
  }

  get productImprovementId() {
    return this.props.productImprovementId;
  }

  get productRatingId() {
    return this.props.productRatingId;
  }

  get cancellationReasonId() {
    return this.props.cancellationReasonId;
  }

  get cancellationStatus() {
    return this.props.cancellationStatus;
  }

  set userId(userId: number) {
    this.props.userId = userId;
  }

  set educationLevelId(educationLevelId: number) {
    this.props.educationLevelId = educationLevelId;
  }

  set universityCourseAreaId(universityCourseAreaId: number) {
    this.props.universityCourseAreaId = universityCourseAreaId;
  }

  set productImprovementId(productImprovementId: number) {
    this.props.productImprovementId = productImprovementId;
  }

  set productRatingId(productRatingId: number) {
    this.props.productRatingId = productRatingId;
  }

  set cancellationReasonId(cancellationReasonId: number) {
    this.props.cancellationReasonId = cancellationReasonId;
  }

  set cancellationStatus(cancellationStatus: string) {
    this.props.cancellationStatus = cancellationStatus;
  }

  static create(props: CancellationProps, id?: UniqueEntityID) {
    const cancellation = new Cancellation(
      {
        ...props,
      },
      id,
    );

    return cancellation;
  }
}
