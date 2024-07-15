import { AuthSession } from '@backend/domain/user/entities/auth-session-entity';

export abstract class AuthSessionRepository {
  abstract findById(id: string): Promise<AuthSession | null>;
}
