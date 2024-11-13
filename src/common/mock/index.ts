import { Users } from '@/database/entities';
import { Role } from '../enums';
import { ObjectId } from 'mongodb';
import { CreateUserDto, UpdateUserDto } from '@/modules/users/dto';
import { UsersService } from '@/modules/users/users.service';
import { UsersRepository } from '@/database/repositories';

export const mockUserId = '6730076f780b5568fdc63421';

export const mockUser: Users = {
  _id: new ObjectId(mockUserId),
  name: 'userTest',
  lastName: '',
  email: 'usertest@mail.com',
  password: 'passwordTest',
  role: Role.ADMIN,
  active: true,
  image: '',
  createdAt: new Date(),
  hashPassword: async () => Promise.resolve(),
  setDefaults: () => null,
};

export const mockUsers: Users[] = [mockUser];

export const mockCreateUserDto: CreateUserDto = { ...mockUser };

export const mockUpdateUserDto: UpdateUserDto = { ...mockUser };

export const mockUsersRepository: Partial<UsersRepository> = {
  find: jest.fn().mockResolvedValue(mockUsers),
  findOne: jest.fn().mockResolvedValueOnce(mockUser),
  save: jest.fn().mockImplementation(() => Promise.resolve()),
};

export const mockUsersService: Partial<UsersService> = {
  find: jest.fn().mockResolvedValue(mockUsers),
  findOne: jest.fn().mockResolvedValueOnce(mockUser),
  create: jest.fn().mockResolvedValueOnce('User created success!'),
  update: jest.fn().mockResolvedValueOnce('User updated success!'),
};
