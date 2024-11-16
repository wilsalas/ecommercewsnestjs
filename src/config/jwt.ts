import { Environment } from '@/common/enums';
import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const JWT_MODULE: JwtModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>(Environment.ENDPOINT_SECRET_KEY),
    signOptions: {
      expiresIn: config.get<string>(Environment.TOKEN_SIGN_EXPIRATION_TIME),
    },
  }),
};
