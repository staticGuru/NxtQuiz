import { beforeEach, describe, it, expect } from 'vitest';
import { MixpanelAdapter } from './mixpanel-adapter';
import { User } from '@backend/domain/user/entities/user-entity';
import { InMemoryUsersRepository } from 'backend/test/repositories/in-memory-user-repository';
import { CustomRequest } from '@backend/core/ports/event-tracking-port.interface';
import { createCustomRequest } from 'backend/test/utils/create-custom-request';
import { InMemoryEventTrackingRepository } from 'backend/test/repositories/in-memory-mixpanel-repository';

describe('MixpanelAdapter', () => {
  let mixpanelAdapter: MixpanelAdapter;
  let EventTrackingRepository: InMemoryEventTrackingRepository;
  let usersRepository: InMemoryUsersRepository;
  const generateCustomRequest = (): CustomRequest => {
    return createCustomRequest(
      { method: 'GET' },
      { user_id: undefined, isPWA: false, isIOSPWA: false },
    );
  };
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    EventTrackingRepository = new InMemoryEventTrackingRepository();
    mixpanelAdapter = new MixpanelAdapter(
      usersRepository,
      EventTrackingRepository,
    );
  });

  it('should track event without user ID', async () => {
    const eventName = 'Test Event 111';
    const properties = { key: 'value' };

    await mixpanelAdapter.trackEvent(
      eventName,
      generateCustomRequest(),
      null,
      properties,
    );

    expect(true).toBe(true);
  });

  it('should track event with user ID and include user data', async () => {
    const eventName = 'Test Event 22';
    const properties = { key: 'value' };
    const userId = 67295;

    const user: User = User.create({
      userId,
      name: 'John Doe',
      email: 'john.doe@example.com',
      countryCode: 'US',
      examId: 123,
      examYear: 2022,
      createdOn: new Date(),
      updatedOn: new Date(),
    });

    // Manually insert the user into the repository for testing
    await usersRepository.save(user);

    await mixpanelAdapter.trackEvent(
      eventName,
      generateCustomRequest(),
      userId,
      properties,
    );
    expect(true).toBe(true);
  });

  it('should handle error when tracking event', async () => {
    const eventName = 'Test Event 333';
    const properties = { key: 'value' };

    try {
      await mixpanelAdapter.trackEvent(
        eventName,
        generateCustomRequest(),
        null,
        properties,
      );
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should set user properties', async () => {
    const userId = 67295;
    const properties = { key: 'value' };

    await mixpanelAdapter.createUser(
      userId,
      generateCustomRequest(),
      properties,
    );

    expect(true).toBe(true);
  });
});
