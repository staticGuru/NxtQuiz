import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface UserPlanProps {
  userPlanId: number;
  userId: number;
  membershipId: number;
  membershipStartDate: Date;
  membershipExpiryDate: Date;
  membershipCancelledDate: Date | null;
  txnId: string;
  subscriptionId: string;
  updatedOn: Date;
  createdOn: Date;
  status: string;
  billingService: string;
  rvtStatus: number;
}

export class UserPlan extends Entity<UserPlanProps> {
  get userPlanId() {
    return this.props.userPlanId;
  }

  set userPlanId(userPlanId: number) {
    this.props.userPlanId = userPlanId;
  }

  get userId() {
    return this.props.userId;
  }

  set userId(userId: number) {
    this.props.userId = userId;
  }

  get membershipId() {
    return this.props.membershipId;
  }

  set membershipId(membershipId: number) {
    this.props.membershipId = membershipId;
  }

  get membershipStartDate() {
    return this.props.membershipStartDate;
  }

  set membershipStartDate(membershipStartDate: Date) {
    this.props.membershipStartDate = membershipStartDate;
  }

  get membershipExpiryDate() {
    return this.props.membershipExpiryDate;
  }

  set membershipExpiryDate(membershipExpiryDate: Date) {
    this.props.membershipExpiryDate = membershipExpiryDate;
  }

  get membershipCancelledDate() {
    return this.props.membershipCancelledDate;
  }

  set membershipCancelledDate(membershipCancelledDate: Date | null) {
    this.props.membershipCancelledDate = membershipCancelledDate;
  }

  get txnId() {
    return this.props.txnId;
  }

  set txnId(txnId: string) {
    this.props.txnId = txnId;
  }

  get subscriptionId() {
    return this.props.subscriptionId;
  }

  set subscriptionId(subscriptionId: string) {
    this.props.subscriptionId = subscriptionId;
  }

  get updatedOn() {
    return this.props.updatedOn;
  }

  set updatedOn(updatedOn: Date) {
    this.props.updatedOn = updatedOn;
  }

  get createdOn() {
    return this.props.createdOn;
  }

  set createdOn(createdOn: Date) {
    this.props.createdOn = createdOn;
  }

  get status() {
    return this.props.status;
  }

  set status(status: string) {
    this.props.status = status;
  }

  get billingService() {
    return this.props.billingService;
  }

  set billingService(billingService: string) {
    this.props.billingService = billingService;
  }

  get rvtStatus() {
    return this.props.rvtStatus;
  }

  set rvtStatus(rvtStatus: number) {
    this.props.rvtStatus = rvtStatus;
  }

  static create(props: UserPlanProps, id?: UniqueEntityID) {
    const userPlan = new UserPlan(
      {
        ...props,
      },
      id,
    );

    return userPlan;
  }
}
