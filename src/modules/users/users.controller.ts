import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth, RequestUser } from '@/common/decorators';
import { Role } from '@/common/enums';
import { IRequestUser } from '@/common/interfaces';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Auth(Role.ADMIN)
  @Get('/find')
  async find() {
    return await this.usersService.find();
  }

  @Auth(Role.ADMIN)
  @ApiParam({ name: 'id', type: String })
  @Get('/findOne/:id')
  async findOne(@Param() id: string) {
    return await this.usersService.findOne(id);
  }

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Auth()
  @Put('/update')
  async update(
    @RequestUser() requestUser: IRequestUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(requestUser.sub, updateUserDto);
  }
}
