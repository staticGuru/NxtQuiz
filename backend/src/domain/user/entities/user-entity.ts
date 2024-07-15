import dayjs from 'dayjs';
import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

// Required properties for creating a user
export type UserCreationRequiredProps = Pick<
  UserProps,
  'userId' | 'name' | 'email' | 'createdOn' | 'userRole' | 'countryCode'
>;

// Optional properties that can also be provided during creation
export type UserCreationOptionalProps = Partial<
  Omit<UserProps, keyof UserCreationRequiredProps>
>;

export interface UserProps {
  userId: number;
  name: string;
  email: string;
  countryCode: string;
  examId: number | null;
  examYear: number | null;
  userRole?: number;
  parentUser?: number;
  parentEmail?: string;
  secretKey?: string | null;
  contact?: string;
  school?: string;
  hardestSubject: string | null;
  subjectId: string | null;
  password: string;
  googleId: string;
  facebookId: string;
  appleId: string | null;
  referralCode: string;
  salt: string;
  status: number;
  newPasswordKey: string;
  verifyKey: string;
  lastLogin: Date;
  loginStatus: number;
  sessionCount: number;
  ipAddress: string;
  cartExpiry: Date | null;
  createdBy: number | null;
  createdOn: Date;
  updatedBy: number | null;
  updatedOn: Date;
  isAppPopupDismissed: number;
  parentsPhoneNumber: string | null;
  freeScanYourAnswerUsedOn: Date | null;
  printCount: number;
}

export class User extends Entity<UserProps> {
  get userId() {
    return this.props.userId;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  get createdOn() {
    return this.props.createdOn;
  }

  get updatedOn() {
    return this.props.updatedOn;
  }

  get countryCode() {
    return this.props.countryCode;
  }

  set countryCode(countryCode: string) {
    this.props.countryCode = countryCode;
    this.touch();
  }

  get examId() {
    return this.props.examId;
  }

  set examId(examId: number | null) {
    this.props.examId = examId;
    this.touch();
  }

  get examYear() {
    return this.props.examYear;
  }

  set examYear(examYear: number | null) {
    this.props.examYear = examYear;
    this.touch();
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdOn, 'days') <= 3;
  }

  get userRole() {
    return this.props.userRole ?? 0;
  }

  get parentUser() {
    return this.props.parentUser;
  }

  get parentEmail() {
    return this.props.parentEmail;
  }

  get secretKey() {
    return this.props.secretKey;
  }

  get contact() {
    return this.props.contact;
  }

  get school() {
    return this.props.school;
  }

  get hardestSubject() {
    return this.props.hardestSubject;
  }

  get subjectId() {
    return this.props.subjectId;
  }

  set subjectId(subjectId: string | null) {
    this.props.subjectId = subjectId;
    this.touch();
  }

  get password() {
    return this.props.password;
  }

  get googleId() {
    return this.props.googleId;
  }

  get facebookId() {
    return this.props.facebookId;
  }

  get appleId() {
    return this.props.appleId;
  }

  get referralCode() {
    return this.props.referralCode;
  }

  get salt() {
    return this.props.salt;
  }

  get status() {
    return this.props.status;
  }

  get newPasswordKey() {
    return this.props.newPasswordKey;
  }

  get verifyKey() {
    return this.props.verifyKey;
  }

  get lastLogin() {
    return this.props.lastLogin;
  }

  get loginStatus() {
    return this.props.loginStatus;
  }

  get sessionCount() {
    return this.props.sessionCount;
  }

  get ipAddress() {
    return this.props.ipAddress;
  }

  get cartExpiry() {
    return this.props.cartExpiry;
  }

  get createdBy() {
    return this.props.createdBy;
  }

  get updatedBy() {
    return this.props.updatedBy;
  }

  get isAppPopupDismissed() {
    return this.props.isAppPopupDismissed;
  }

  get parentsPhoneNumber() {
    return this.props.parentsPhoneNumber;
  }

  get freeScanYourAnswerUsedOn() {
    return this.props.freeScanYourAnswerUsedOn;
  }

  get printCount() {
    return this.props.printCount;
  }

  private touch() {
    this.props.updatedOn = new Date();
  }

  static create(
    props: UserCreationRequiredProps & UserCreationOptionalProps,
    id?: UniqueEntityID,
  ) {
    const user = new User(
      {
        ...props,
        createdOn: props.createdOn ?? new Date(),
        updatedOn: props.updatedOn ?? new Date(),
        examId: props.examId ?? null,
        examYear: props.examYear ?? null,
        userRole: props.userRole ?? 0,
        parentUser: props.parentUser ?? 0,
        secretKey: props.secretKey ?? null,
        contact: props.contact ?? '',
        school: props.school ?? '',
        hardestSubject: props.hardestSubject ?? null,
        subjectId: props.subjectId ?? null,
        password: props.password ?? '',
        googleId: props.googleId ?? '',
        facebookId: props.facebookId ?? '',
        appleId: props.appleId ?? null,
        referralCode: props.referralCode ?? '',
        salt: props.salt ?? '',
        status: props.status ?? 0,
        newPasswordKey: props.newPasswordKey ?? '',
        verifyKey: props.verifyKey ?? '',
        lastLogin: props.lastLogin ?? new Date(),
        loginStatus: props.loginStatus ?? 0,
        sessionCount: props.sessionCount ?? 0,
        ipAddress: props.ipAddress ?? '',
        cartExpiry: props.cartExpiry ?? null,
        createdBy: props.createdBy ?? null,
        updatedBy: props.updatedBy ?? null,
        isAppPopupDismissed: props.isAppPopupDismissed ?? 0,
        parentsPhoneNumber: props.parentsPhoneNumber ?? null,
        freeScanYourAnswerUsedOn: props.freeScanYourAnswerUsedOn ?? null,
        printCount: props.printCount ?? 0,
      },
      id,
    );

    return user;
  }
}
