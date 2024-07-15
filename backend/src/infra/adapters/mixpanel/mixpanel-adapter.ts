import {
  EventTrackingPort,
  EventProperties,
  UserProperties,
  CustomRequest,
} from '@backend/core/ports/event-tracking-port.interface';
import { EventTrackingRepository } from '@backend/domain/event-tracking/repositories/event-tracking-repository';
import { User } from '@backend/domain/user/entities/user-entity';
import { UsersRepository } from '@backend/domain/user/repositories/user-repository';
import {
  getBrowserName,
  getDeviceType,
  getOsName,
} from '@backend/utils/user-agent';
import { Injectable } from '@nestjs/common';
import { Mixpanel, init } from 'mixpanel';

@Injectable()
export class MixpanelAdapter implements EventTrackingPort {
  private mixpanel: Mixpanel = init(process.env.MIXPANEL_TOKEN ?? '', {
    host: 'api-eu.mixpanel.com',
    keepAlive: false,
  });

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly eventTrackingRepository: EventTrackingRepository,
  ) {}

  /**
   * Generate event object with the necessary properties.
   * @param eventName - Name of the event to be tracked
   * @param req - Custom request object containing headers and other information
   * @param user - Optional user object
   * @param properties - Additional event properties
   * @returns An object containing event name and properties
   */
  private generateEventObject(
    eventName: string,
    req: CustomRequest,
    user?: User | null,
    properties: EventProperties = {},
  ) {
    const ip = req.headers['x-forwarded-for'] || '127.0.0.1';
    const userAgent = req.headers['user-agent'];

    return {
      event: eventName,
      properties: {
        time: Math.floor(Date.now() / 1000), // Current timestamp in seconds
        distinct_id: user?.userId
          ? `${user.userId}_${user.countryCode}`
          : `unknown-${ip}`, // Unique identifier for the event
        $insert_id: Math.random().toString(36).substr(2, 9), // Random unique ID
        ip,
        browser: getBrowserName(userAgent), // Extracted browser name from user-agent
        device: getDeviceType(userAgent), // Extracted device type from user-agent
        operative_system: getOsName(userAgent), // Extracted OS name from user-agent
        platform: req.isPWA ? 'App' : 'Website', // Platform type
        site: process.env.APP_URL, // Application URL
        ...properties, // Additional event properties
      },
    };
  }

  /**
   * Track an event in Mixpanel.
   * @param eventName - Name of the event to be tracked
   * @param req - Custom request object containing headers and other information
   * @param properties - Additional event properties
   * @param userId - Optional user ID
   */
  async trackEvent(
    eventName: string,
    req: CustomRequest,
    userId?: number | null,
    properties: EventProperties = {},
  ): Promise<void> {
    const currentUserID = userId ?? req.user_id ?? 0;
    const user = await this.usersRepository.findById(currentUserID);
    const event = this.generateEventObject(eventName, req, user, properties);
    await this.mixpanel.track(event.event, event.properties);
  }

  /**
   * Create or update a user in Mixpanel.
   * @param userId - ID of the user to be created or updated
   * @param req - Custom request object containing headers and other information
   * @param properties - Additional user properties
   */
  async createUser(
    userId: number,
    req: CustomRequest,
    properties: UserProperties,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const userDetails =
        await this.eventTrackingRepository.getUserDetails(userId);
      if (!userDetails) {
        reject(new Error(`User not found: ${userId}`));
        return;
      }

      const userProperties = {
        ...{
          ...userDetails,
          session_count: isNaN(userDetails.session_count)
            ? null
            : userDetails.session_count,
          last_login: userDetails.last_login
            ? userDetails.last_login.toString()
            : null,
          user_lifetime: isNaN(userDetails.user_lifetime)
            ? null
            : userDetails.user_lifetime,
        },
        ...(properties ? properties : {}),
        $first_name: userDetails?.user_name?.split(' ')[0] ?? '', // Extract first name
        $last_name: userDetails?.user_name?.split(' ')[1] ?? '', // Extract last name
        $email: userDetails.user_email, // User email
        browser: getBrowserName(req.headers['user-agent']), // Extracted browser name from user-agent
        device: getDeviceType(req.headers['user-agent']), // Extracted device type from user-agent
        operative_system: getOsName(req.headers['user-agent']), // Extracted OS name from user-agent
        platform: req.isPWA ? 'App' : 'Website', // Platform type
        site: process.env.APP_URL, // Application URL
      };
      // Set user properties in Mixpanel
      await this.mixpanel.people.set(
        `${userId.toString()}_${userDetails.country_code}`,
        userProperties,
        (err: Error | undefined) => {
          if (err) {
            reject(err);
          } else {
            console.log('Mixpanel User created successfully');
            resolve();
          }
        },
      );
    });
  }
}
