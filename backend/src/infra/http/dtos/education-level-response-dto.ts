import { EducationLevel } from '@backend/domain/education-level/entities/education-level-entity';
import { ApiProperty } from '@nestjs/swagger';

export class EducationLevelResponseDto {
  @ApiProperty()
  educationLevelId: number;

  @ApiProperty()
  educationLevelName: string;

  @ApiProperty()
  educationLevelIcon: string;

  public static toDto(
    educationLevel: EducationLevel,
  ): EducationLevelResponseDto {
    return {
      educationLevelId: educationLevel.educationLevelId,
      educationLevelName: educationLevel.educationLevelName,
      educationLevelIcon: educationLevel.educationLevelIcon,
    };
  }
}
