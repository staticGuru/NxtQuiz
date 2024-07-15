import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface EducationLevelProps {
  educationLevelId: number;
  educationLevelName: string;
  educationLevelIcon: string;
}

export class EducationLevel extends Entity<EducationLevelProps> {
  get educationLevelId() {
    return this.props.educationLevelId;
  }

  get educationLevelName() {
    return this.props.educationLevelName;
  }

  get educationLevelIcon() {
    return this.props.educationLevelIcon;
  }

  set educationLevelId(educationLevelId: number) {
    this.props.educationLevelId = educationLevelId;
  }

  set educationLevelName(educationLevelName: string) {
    this.props.educationLevelName = educationLevelName;
  }

  set educationLevelIcon(educationLevelIcon: string) {
    this.props.educationLevelIcon = educationLevelIcon;
  }

  static create(props: EducationLevelProps, id?: UniqueEntityID) {
    const educationLevel = new EducationLevel(
      {
        ...props,
      },
      id,
    );

    return educationLevel;
  }
}
