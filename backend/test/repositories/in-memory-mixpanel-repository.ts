import {
  EventTrackingRepository,
  UserDetails,
} from '@backend/domain/event-tracking/repositories/event-tracking-repository';

export class InMemoryEventTrackingRepository
  implements EventTrackingRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUserDetails(userId: number): Promise<UserDetails | null> {
    const userDetails: UserDetails = {
      user_name: 'Test User',
      user_email: 'testuser@gmail.com',
      exam_name: 'Junior Cycle',
      country_name: 'Ireland',
      country_code: 'IE',
      subjects: 'English, Irish',
      signup_method: 'E-mail',
      signup_source: 'Unknown',
      exam_year_title: 'Unknown',
      session_count: 1,
      last_login: '2024-04-16 14:41:43',
      university_plan: 'Unknown',
      streak_goal: 'Unknown',
      student_type: 'Quite hardworking',
      study_goal: 'Unknown',
      favourite_subject: 'Unknown',
      hardest_subject: 'Unknown',
      school_name: 'Unknown',
      user_lifetime: 55,
      mrr_value: 0,
      cumulative_spend: 0,
      plan_duration: 0,
      plan_tier: 'Best',
      plan_status: 'Free',
      user_type: 'Free',
      billing_cycle: 'monthly',
    };

    return userDetails;
  }
}
