import { Users } from '@/database/entities';
import { UsersRepository } from '@/database/repositories';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: UsersRepository,
  ) {}

  async find(): Promise<Users[]> {
    return await this.usersRepository.find({
      select: ['_id', 'name', 'lastName', 'email', 'role', 'image', 'active'],
    });
  }

  async findOneByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['_id', 'role', 'email', 'password', 'active'],
    });
    if (!user) throw new NotFoundException('User not found');
    if (!user.active) throw new UnauthorizedException('User Inactive');
    return user;
  }

  async findOne(id: string): Promise<Users> {
    const notFoundError = new NotFoundException('User not found');
    if (!ObjectId.isValid(id)) throw notFoundError;
    const user = await this.usersRepository.findOne({
      where: { _id: new ObjectId(id) },
      select: ['_id', 'name', 'lastName', 'email', 'role', 'image', 'active'],
    });
    if (!user) throw notFoundError;
    if (!user.active) throw new UnauthorizedException('User Inactive');
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const userFound = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
        select: ['email'],
      });
      if (userFound) throw new ConflictException('Email already exists');
      const newUser = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);
      return 'User created success!';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.findOne(id);
    try {
      const userUpdated = Object.assign(user, updateUserDto);
      await this.usersRepository.save(userUpdated);
      return 'User updated success!';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
