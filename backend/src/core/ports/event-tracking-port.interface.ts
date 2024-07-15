export interface CustomRequest extends Request {
  user_id?: number;
  isPWA?: boolean;
  isIOSPWA?: boolean;
  cookies: { [key: string]: string };
}
export interface EventProperties {
  [key: string]: any;
}

export interface UserProperties {
  [key: string]: any;
}

export abstract class EventTrackingPort {
  abstract trackEvent(
    eventName: string,
    req: CustomRequest,
    userId?: number | null,
    properties?: EventProperties,
  ): Promise<void>;
  abstract createUser(
    userId: number,
    req: CustomRequest,
    properties: UserProperties,
  ): Promise<void>;
}
