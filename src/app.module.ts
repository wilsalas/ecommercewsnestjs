import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_MODULE } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_MODULE } from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_MODULE),
    TypeOrmModule.forRootAsync(TYPEORM_MODULE),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
