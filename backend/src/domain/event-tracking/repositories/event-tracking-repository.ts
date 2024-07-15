export interface UserDetails {
  user_name: string;
  user_email: string;
  exam_name: string;
  country_name: string;
  country_code: string;
  subjects: string;
  signup_method: string;
  signup_source: string | null;
  exam_year_title: string | null;
  session_count: number;
  last_login: string;
  university_plan: string;
  streak_goal: string | null;
  student_type: string;
  study_goal: string;
  favourite_subject: string | null;
  hardest_subject: string | null;
  school_name: string | null;
  user_lifetime: number;
  mrr_value: number;
  cumulative_spend: number;
  plan_duration: number;
  plan_tier: string;
  plan_status: string;
  user_type: string;
  billing_cycle: string;
}

export abstract class EventTrackingRepository {
  abstract getUserDetails(userId: number): Promise<UserDetails | null>;
}
