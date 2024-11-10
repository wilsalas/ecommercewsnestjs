import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {
  mockCreateUserDto,
  mockUpdateUserDto,
  mockUser,
  mockUserId,
  mockUsers,
  mockUsersService,
} from '@/common/mock';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect.assertions(1);
    expect(controller).toBeDefined();
  });

  it('should be find defined', () => {
    expect.assertions(1);
    expect(controller.find).toBeDefined();
  });

  it('should be findOne defined', () => {
    expect.assertions(1);
    expect(controller.findOne).toBeDefined();
  });

  it('should be create defined', () => {
    expect.assertions(1);
    expect(controller.create).toBeDefined();
  });

  it('should be update defined', () => {
    expect.assertions(1);
    expect(controller.update).toBeDefined();
  });

  it('get all users', async () => {
    expect.assertions(1);
    const result = await controller.find();
    expect(result).toBe(mockUsers);
  });

  it('get an user', async () => {
    expect.assertions(1);
    const result = await controller.findOne(mockUserId);
    expect(result).toBe(mockUser);
  });

  it('create users', async () => {
    expect.assertions(1);
    const result = await controller.create(mockCreateUserDto);
    expect(result).toBe('User created success!');
  });

  it('update users', async () => {
    expect.assertions(1);
    const result = await controller.update(mockUserId, mockUpdateUserDto);
    expect(result).toBe('User updated success!');
  });
});
