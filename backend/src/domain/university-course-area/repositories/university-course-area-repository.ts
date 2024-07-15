import { UniversityCourseArea } from '@backend/domain/university-course-area/entities/university-course-area-entity';

export abstract class UniversityCourseAreaRepository {
  abstract list(): Promise<UniversityCourseArea[]>;
}
