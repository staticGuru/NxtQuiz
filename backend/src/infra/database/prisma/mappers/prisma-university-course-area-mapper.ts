import {
  university_course_area as PrismaUniversityCourseArea,
  Prisma,
} from '@prisma/client';
import { UniversityCourseArea } from '@backend/domain/university-course-area/entities/university-course-area-entity';

export class PrismaUniversityCourseAreaMapper {
  static toDomain(raw: PrismaUniversityCourseArea): UniversityCourseArea {
    return UniversityCourseArea.create({
      universityCourseAreaId: raw.university_course_area_id,
      universityCourseAreaName: raw.university_course_area_name,
      universityCourseAreaIcon: raw.university_course_area_icon ?? '',
    });
  }

  static toPrisma(
    universityCourseArea: UniversityCourseArea,
  ): Prisma.university_course_areaUncheckedCreateInput {
    return {
      university_course_area_id: universityCourseArea.universityCourseAreaId,
      university_course_area_name:
        universityCourseArea.universityCourseAreaName,
      university_course_area_icon:
        universityCourseArea.universityCourseAreaIcon,
    };
  }
}
