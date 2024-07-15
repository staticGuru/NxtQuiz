import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EducationLevelRepository } from '@backend/domain/education-level/repositories/education-level-repository';
import { EducationLevel } from '@backend/domain/education-level/entities/education-level-entity';
import { PrismaEducationLevelMapper } from '@backend/infra/database/prisma/mappers/prisma-education-level-mapper';

@Injectable()
export class PrismaEducationLevelRepository
  implements EducationLevelRepository
{
  constructor(private prisma: PrismaService) {}

  async list(): Promise<EducationLevel[]> {
    const educationLevels = await this.prisma.education_level.findMany();

    return educationLevels.map(PrismaEducationLevelMapper.toDomain);
  }
}
