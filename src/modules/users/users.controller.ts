import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/find')
  async find() {
    return await this.usersService.find();
  }

  @ApiParam({ name: 'id', type: String })
  @Get('/findOne/:id')
  async findOne(@Param() id: string) {
    return await this.usersService.findOne(id);
  }

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiParam({ name: 'id', type: String })
  @Put('/update/:id')
  async update(@Param() id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }
}
