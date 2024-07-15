import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UniversityCourseAreaRepository } from '@backend/domain/university-course-area/repositories/university-course-area-repository';
import { UniversityCourseArea } from '@backend/domain/university-course-area/entities/university-course-area-entity';
import { PrismaUniversityCourseAreaMapper } from '@backend/infra/database/prisma/mappers/prisma-university-course-area-mapper';

@Injectable()
export class PrismaUniversityCourseAreaRepository
  implements UniversityCourseAreaRepository
{
  constructor(private prisma: PrismaService) {}

  async list(): Promise<UniversityCourseArea[]> {
    const universityCourseAreas =
      await this.prisma.university_course_area.findMany();

    return universityCourseAreas.map(PrismaUniversityCourseAreaMapper.toDomain);
  }
}
