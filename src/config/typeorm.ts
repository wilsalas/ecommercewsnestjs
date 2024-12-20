import { Environment } from '@/common/enums';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const TYPEORM_MODULE: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mongodb',
    host: configService.get<string>(Environment.DB_HOST),
    port: configService.get<number>(Environment.DB_PORT),
    username: configService.get<string>(Environment.DB_USER),
    password: configService.get<string>(Environment.DB_PASSWORD),
    database: configService.get<string>(Environment.DB_NAME),
    entities: [path.join(__dirname, '/../**/**.entity{.ts,.js}')],
    synchronize: false,
    useUnifiedTopology: true,
  }),
};
