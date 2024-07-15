import { User } from '@backend/domain/user/entities/user-entity';
import { InMemoryUsersRepository } from './in-memory-user-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;

beforeEach(() => {
  inMemoryUsersRepository = new InMemoryUsersRepository();
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

  it('should be able to create and get a user', async () => {
    await inMemoryUsersRepository.create(userData);
    const user = await inMemoryUsersRepository.findById(userData.userId);
    expect(user).not.toBeNull();
    expect(user).toEqual(userData);
  });

  it('should be able to update a user', async () => {
    const updatedUserData: User = User.create({
      userId: 1,
      name: 'Bryan Gomes',
      email: 'bryangomes@example.com',
      countryCode: 'UK',
      examId: 124,
      examYear: 2025,
      createdOn: new Date(),
      updatedOn: new Date(),
    });
    await inMemoryUsersRepository.create(userData);
    const updatedUser = await inMemoryUsersRepository.save(updatedUserData);
    expect(updatedUser).not.toBeNull();
  });
});
