import { User } from '@backend/domain/user/entities/user-entity';
import { UsersRepository } from '@backend/domain/user/repositories/user-repository';
import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@backend/core/entities/unique-entity-id';
import { PrismaUserMapper } from '@backend/infra/database/prisma/mappers/prisma-user-mapper';
import { DatabaseError } from '@backend/core/errors/errors/resource-not-found-error';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        user_id: id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    return user
      ? User.create(
          {
            userId: user.user_id,
            name: user.name,
            email: user.email || '',
            createdOn: new Date(user.created_on),
            updatedOn: new Date(user.updated_on),
            countryCode: user.country_code,
            examId: user.exam_id,
            examYear: user.exam_year,
          },
          new UniqueEntityID(user.user_id),
        )
      : null;
  }

  async save(user: User): Promise<void> {
    try {
      const data = PrismaUserMapper.toPrisma(user);
      await this.prisma.users.update({
        where: {
          user_id: user.userId,
        },
        data: {
          name: data.name,
          email: data.email,
          country_code: data.country_code,
          exam_id: data.exam_id,
          exam_year: data.exam_year,
          subject_id: data.subject_id,
        },
      });
    } catch (error) {
      // Log the error
      console.error('Database error:', error);
      throw new DatabaseError('Failed to save user.');
    }
  }
}
