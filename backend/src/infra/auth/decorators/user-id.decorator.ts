// user-id.decorator.ts
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = parseInt(request.user_id, 10);

    if (!userId) {
      throw new BadRequestException('UserId is missing');
    }
    return userId;
  },
);
