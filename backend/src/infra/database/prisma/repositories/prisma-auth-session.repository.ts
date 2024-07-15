import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AuthSessionRepository } from '@backend/domain/user/repositories/auth-session-repository';
import { AuthSession } from '@backend/domain/user/entities/auth-session-entity';

@Injectable()
export class PrismaAuthSessionsRepository implements AuthSessionRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<AuthSession | null> {
    const session = await this.prisma.session.findUnique({
      where: {
        id,
      },
    });

    return session ? AuthSession.create(session) : null;
  }
}
