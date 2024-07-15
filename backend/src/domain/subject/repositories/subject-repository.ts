import { Subject } from '@backend/domain/subject/entities/subject-entity';

export abstract class SubjectRepository {
  abstract list(): Promise<Subject[]>;
  abstract getSubjectsByExamId(examId: number): Promise<Subject[]>;
  abstract getById(subjectId: number): Promise<Subject | null>;
}
