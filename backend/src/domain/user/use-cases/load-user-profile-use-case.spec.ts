import { InMemoryUsersRepository } from 'backend/test/repositories/in-memory-user-repository';
import { User } from '@backend/domain/user/entities/user-entity';
import { LoadUserProfileUseCase } from './load-user-profile-use-case';

let inMemoryUsersRepository: InMemoryUsersRepository;
let useCase: LoadUserProfileUseCase;
beforeEach(() => {
  inMemoryUsersRepository = new InMemoryUsersRepository();
  useCase = new LoadUserProfileUseCase(inMemoryUsersRepository);
});

describe('Fetch Answer Comments', () => {
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

  it('should be able to fetch a user by id', async () => {
    await inMemoryUsersRepository.create(userData);
    const response = await useCase.execute({
      userId: userData.userId,
    });
    expect(response).not.toBeNull();
    expect(response.isRight()).toBe(true);
    if (response.isRight()) {
      expect(response.value.user.userId).toBe(userData.userId);
    }
  });
});
