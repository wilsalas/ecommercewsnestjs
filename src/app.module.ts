import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_MODULE, TYPEORM_MODULE } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CacheManagerProviderModule } from './common/providers';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_MODULE),
    TypeOrmModule.forRootAsync(TYPEORM_MODULE),
    CacheManagerProviderModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
