import { Entity } from '@backend/core/entities/entity';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';

export interface UniversityCourseAreaProps {
  universityCourseAreaId: number;
  universityCourseAreaName: string;
  universityCourseAreaIcon: string;
}

export class UniversityCourseArea extends Entity<UniversityCourseAreaProps> {
  get universityCourseAreaId() {
    return this.props.universityCourseAreaId;
  }

  get universityCourseAreaName() {
    return this.props.universityCourseAreaName;
  }

  get universityCourseAreaIcon() {
    return this.props.universityCourseAreaIcon;
  }

  set universityCourseAreaId(universityCourseAreaId: number) {
    this.props.universityCourseAreaId = universityCourseAreaId;
  }

  set universityCourseAreaName(universityCourseAreaName: string) {
    this.props.universityCourseAreaName = universityCourseAreaName;
  }

  set universityCourseAreaIcon(universityCourseAreaIcon: string) {
    this.props.universityCourseAreaIcon = universityCourseAreaIcon;
  }

  static create(props: UniversityCourseAreaProps, id?: UniqueEntityID) {
    const universityCourseArea = new UniversityCourseArea(
      {
        ...props,
      },
      id,
    );

    return universityCourseArea;
  }
}
