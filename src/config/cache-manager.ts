import { Environment } from '@/common/enums';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const CACHE_MANAGER_MODULE: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.get<string>(Environment.REDIS_HOST),
        port: configService.get<number>(Environment.REDIS_PORT),
      },
    });
    return {
      store: () => store,
      ttl: configService.get<number>(Environment.CACHE_MANAGER_TTL),
    };
  },
};
