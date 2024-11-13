import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy, JwtAuthStrategy } from './strategies';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PASSPORT_MODULE, JWT_MODULE } from '@/config';

@Module({
  imports: [
    PassportModule.register(PASSPORT_MODULE),
    JwtModule.registerAsync(JWT_MODULE),
    UsersModule,
  ],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
