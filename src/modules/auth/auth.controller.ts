import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto';
import { RequestUser } from '@/common/decorators';
import { IRequestUser } from '@/common/interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  @Post('/signIn')
  signIn(@RequestUser() requestUser: IRequestUser) {
    return this.authService.signIn(requestUser);
  }
}
