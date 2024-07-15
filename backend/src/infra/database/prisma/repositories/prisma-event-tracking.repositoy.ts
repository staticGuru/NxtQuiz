import {
  EventTrackingRepository,
  UserDetails,
} from '@backend/domain/event-tracking/repositories/event-tracking-repository';
import { PrismaService } from '@backend/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaEventTrackingRepository implements EventTrackingRepository {
  constructor(private prisma: PrismaService) {}

  async getUserDetails(userId: number): Promise<UserDetails | null> {
    const result = await this.prisma.$queryRaw<
      any[]
    >`CALL GetUserDetails(${userId})`;
    if (result.length > 0) {
      const row = result[0];
      const userDetails: UserDetails = {
        user_name: row.f0,
        user_email: row.f1,
        exam_name: row.f2,
        country_name: row.f3,
        country_code: 'IE',
        subjects: row.f4,
        signup_method: row.f5,
        signup_source: row.f6,
        exam_year_title: row.f7,
        session_count: Number(row.f8),
        last_login: row.f9,
        university_plan: row.f10,
        streak_goal: row.f11,
        student_type: row.f12,
        study_goal: row.f13,
        favourite_subject: row.f14,
        hardest_subject: row.f15,
        school_name: row.f16,
        user_lifetime: Number(row.f17),
        mrr_value: Number(row.f18),
        cumulative_spend: Number(row.f19),
        plan_duration: Number(row.f20),
        plan_tier: row.f21,
        plan_status: row.f22,
        user_type: row.f23,
        billing_cycle: row.f24,
      };
      return userDetails;
    }
    return null;
  }
}
