import { User } from '@backend/domain/user/entities/user-entity';
import { UsersRepository } from '@backend/domain/user/repositories/user-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: number): Promise<User | null> {
    const user = this.items.find((item) => item.userId === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User) {
    this.items.push(user);
  }

  async save(user: User): Promise<void> {
    const existingUserIndex = this.items.findIndex(
      (item) => item.userId === user.userId,
    );

    if (existingUserIndex === -1) {
      this.items.push(user);
    } else {
      this.items[existingUserIndex] = user;
    }
  }
}
