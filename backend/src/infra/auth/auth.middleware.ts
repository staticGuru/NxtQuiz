import { CustomRequest } from '@backend/core/ports/event-tracking-port.interface';
import { isIOSPWA, isPWA } from '@backend/utils/pwa';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

// Extend the Request interface to include user_id
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const SupportUserId = 67373; // Hardcoded support user ID to be used in code test assessment
    req.user_id = SupportUserId;
    req.isPWA = isPWA(req);
    req.isIOSPWA = isIOSPWA(req);
    next();
  }
}
