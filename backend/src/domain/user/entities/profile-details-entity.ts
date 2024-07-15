import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface ProfileDetailsProps {
  userId: number;
  favoriteSubject?: string;
  school?: string;
  studyGoal?: string;
  university?: string;
  hourlyStudyGoal?: string;
  hardestSubject?: string;
  schoolId?: number;
  studentType?: number;
}

export class ProfileDetails extends Entity<ProfileDetailsProps> {
  get userId(): number {
    return this.props.userId;
  }

  get favoriteSubject(): string | undefined {
    return this.props.favoriteSubject;
  }

  get school(): string | undefined {
    return this.props.school;
  }

  get studyGoal(): string | undefined {
    return this.props.studyGoal;
  }

  get university(): string | undefined {
    return this.props.university;
  }

  get hourlyStudyGoal(): string | undefined {
    return this.props.hourlyStudyGoal;
  }

  get hardestSubject(): string | undefined {
    return this.props.hardestSubject;
  }

  get schoolId(): number | undefined {
    return this.props.schoolId;
  }

  get studentType(): number | undefined {
    return this.props.studentType;
  }

  set favoriteSubject(favoriteSubject: string | undefined) {
    this.props.favoriteSubject = favoriteSubject;
  }

  set school(school: string | undefined) {
    this.props.school = school;
  }

  set studyGoal(studyGoal: string | undefined) {
    this.props.studyGoal = studyGoal;
  }

  set university(university: string | undefined) {
    this.props.university = university;
  }

  set hourlyStudyGoal(hourlyStudyGoal: string | undefined) {
    this.props.hourlyStudyGoal = hourlyStudyGoal;
  }

  set hardestSubject(hardestSubject: string | undefined) {
    this.props.hardestSubject = hardestSubject;
  }

  set schoolId(schoolId: number | undefined) {
    this.props.schoolId = schoolId;
  }

  set studentType(studentType: number | undefined) {
    this.props.studentType = studentType;
  }

  static create(
    props: ProfileDetailsProps,
    id?: UniqueEntityID,
  ): ProfileDetails {
    const profileDetails = new ProfileDetails(
      {
        ...props,
      },
      id,
    );

    return profileDetails;
  }
}
