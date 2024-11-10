import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Users } from '@/database/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockCreateUserDto,
  mockUpdateUserDto,
  mockUser,
  mockUserId,
  mockUsers,
  mockUsersRepository,
} from '@/common/mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be find defined', () => {
    expect.assertions(1);
    expect(service.find).toBeDefined();
  });

  it('should be findOne defined', () => {
    expect.assertions(1);
    expect(service.findOne).toBeDefined();
  });

  it('should be create defined', () => {
    expect.assertions(1);
    expect(service.create).toBeDefined();
  });

  it('should be update defined', () => {
    expect.assertions(1);
    expect(service.update).toBeDefined();
  });

  it('get all users', async () => {
    expect.assertions(1);
    const result = await service.find();
    expect(result).toBe(mockUsers);
  });

  it('get an user', async () => {
    expect.assertions(1);
    const result = await service.findOne(mockUserId);
    expect(result).toBe(mockUser);
  });

  it('not found user by object id', async () => {
    expect.assertions(1);
    await expect(service.findOne('test')).rejects.toThrow(NotFoundException);
  });

  it('not found user', async () => {
    expect.assertions(1);
    await expect(service.findOne(mockUserId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('create users', async () => {
    expect.assertions(1);
    const result = await service.create(mockCreateUserDto);
    expect(result).toBe('User created success!');
  });

  it('create users without lastName and image', async () => {
    expect.assertions(1);
    const createUserDto = { ...mockCreateUserDto };
    delete createUserDto.lastName;
    delete createUserDto.image;
    const result = await service.create(createUserDto);
    expect(result).toBe('User created success!');
  });

  it('create users - email already exists', async () => {
    expect.assertions(1);
    jest
      .spyOn(mockUsersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockUser));
    await expect(service.create(mockCreateUserDto)).rejects.toThrow();
  });

  it('update users', async () => {
    expect.assertions(1);
    const result = await service.update(mockUserId, mockUpdateUserDto);
    expect(result).toBe('User updated success!');
  });

  it('update users error save', async () => {
    expect.assertions(1);
    jest.spyOn(mockUsersRepository, 'save').mockImplementation(() => {
      throw new BadRequestException();
    });
    await expect(
      service.update(mockUserId, mockUpdateUserDto),
    ).rejects.toThrow();
  });
});
