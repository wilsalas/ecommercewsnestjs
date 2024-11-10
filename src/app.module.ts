import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_MODULE } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_MODULE } from './config/typeorm';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_MODULE),
    TypeOrmModule.forRootAsync(TYPEORM_MODULE),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
