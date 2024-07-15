import { EducationLevel } from '@backend/domain/education-level/entities/education-level-entity';

export abstract class EducationLevelRepository {
  abstract list(): Promise<EducationLevel[]>;
}
