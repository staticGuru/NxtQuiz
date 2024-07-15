import { InMemoryUsersRepository } from 'backend/test/repositories/in-memory-user-repository';
import { InMemoryProfileDetailsRepository } from 'backend/test/repositories/in-memory-profile-details-repository';
import { User } from '@backend/domain/user/entities/user-entity';
import { UpdateUserProfileUseCase } from './update-user-profile-use-case';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryProfileDetailsRepository: InMemoryProfileDetailsRepository;
let useCase: UpdateUserProfileUseCase;
beforeEach(() => {
  inMemoryUsersRepository = new InMemoryUsersRepository();
  useCase = new UpdateUserProfileUseCase(
    inMemoryUsersRepository,
    inMemoryProfileDetailsRepository,
  );
});

describe('Update User Profile', () => {
  const userData: User = User.create({
    userId: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    countryCode: 'US',
    examId: 123,
    examYear: 2022,
    createdOn: new Date(),
    updatedOn: new Date(),
  });

  it.skip('it should be able to update user profile', async () => {
    const updatedUserData: User = User.create({
      userId: 1,
      name: 'Bryan Gomes',
      email: 'bryan.gomes@example.com',
      countryCode: 'UK',
      examId: 124,
      examYear: 2025,
      createdOn: new Date(),
    });

    await inMemoryUsersRepository.create(userData);
    const user = await useCase.execute({
      userId: userData.userId,
      name: updatedUserData.name,
      email: updatedUserData.email,
      countryCode: updatedUserData.countryCode,
      examId: updatedUserData.examId,
      examYear: updatedUserData.examYear,
    });
    expect(user).not.toBeNull();
    expect(user.isRight()).toBe(true);
    if (user.isRight()) {
      expect(user.value.user.userId).toBe(userData.userId);
      expect(user.value.user.name).toBe(userData.name);
      expect(user.value.user.email).toBe(userData.email);
      expect(user.value.user.countryCode).toBe(userData.countryCode);
      expect(user.value.user.examId).toBe(userData.examId);
    }
  });
});
