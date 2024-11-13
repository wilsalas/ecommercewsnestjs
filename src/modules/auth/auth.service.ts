import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from '@/database/entities';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IRequestUser } from '@/common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Users> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user.active) throw new UnauthorizedException('User Inactive');
    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Credentials incorrect');
    }
    return user;
  }

  signIn(requestUser: IRequestUser) {
    return {
      email: requestUser.email,
      role: requestUser.role,
      access_token: this.jwtService.sign({
        sub: requestUser.sub,
        role: requestUser.role,
      }),
    };
  }

  async refreshAccessToken(header: { authorization: string }): Promise<string> {
    const token = header.authorization.split(' ')[1];
    const newToken = this.jwtService.decode(token);
    delete newToken.iat;
    delete newToken.exp;
    return await this.jwtService.signAsync(newToken);
  }
}