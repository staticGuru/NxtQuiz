import { UniversityCourseArea } from '@backend/domain/university-course-area/entities/university-course-area-entity';
import { ApiProperty } from '@nestjs/swagger';

export class UniversityCourseAreaResponseDto {
  @ApiProperty()
  universityCourseAreaId: number;

  @ApiProperty()
  universityCourseAreaName: string;

  @ApiProperty()
  universityCourseAreaIcon: string;

  public static toDto(
    universityCourseArea: UniversityCourseArea,
  ): UniversityCourseAreaResponseDto {
    return {
      universityCourseAreaId: universityCourseArea.universityCourseAreaId,
      universityCourseAreaName: universityCourseArea.universityCourseAreaName,
      universityCourseAreaIcon: universityCourseArea.universityCourseAreaIcon,
    };
  }
}
