import { User } from '@backend/domain/user/entities/user-entity';

export abstract class UsersRepository {
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
  // abstract findBySlug(slug: string): Promise<User | null>;
  // abstract create(User: User): Promise<void>;
  // abstract delete(User: User): Promise<void>;
}
