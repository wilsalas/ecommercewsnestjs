import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Environment } from '@/common/enums';
import { IJwtAuthPayload, IRequestUser } from '@/common/interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>(Environment.ENDPOINT_SECRET_KEY),
    });
  }

  async validate(jwtPayload: IJwtAuthPayload): Promise<IRequestUser> {
    const result = await this.authService.validateJwtUser(jwtPayload.sub);
    return {
      ...result,
      sub: result._id.toString(),
    };
  }
}
