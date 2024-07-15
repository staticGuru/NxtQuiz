import {
  education_level as PrismaEducationLevel,
  Prisma,
} from '@prisma/client';
import { EducationLevel } from '@backend/domain/education-level/entities/education-level-entity';

export class PrismaEducationLevelMapper {
  static toDomain(raw: PrismaEducationLevel): EducationLevel {
    return EducationLevel.create({
      educationLevelId: raw.education_level_id,
      educationLevelName: raw.education_level_name,
      educationLevelIcon: raw.education_level_icon ?? '',
    });
  }

  static toPrisma(
    educationLevel: EducationLevel,
  ): Prisma.education_levelUncheckedCreateInput {
    return {
      education_level_id: educationLevel.educationLevelId,
      education_level_name: educationLevel.educationLevelName,
      education_level_icon: educationLevel.educationLevelIcon,
    };
  }
}
