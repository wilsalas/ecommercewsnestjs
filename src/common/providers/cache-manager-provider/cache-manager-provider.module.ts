import { Global, Module } from '@nestjs/common';
import { CacheManagerProvider } from './cache-manager-provider';
import { CacheModule } from '@nestjs/cache-manager';
import { CACHE_MANAGER_MODULE } from '@/config';

@Global()
@Module({
  imports: [CacheModule.registerAsync(CACHE_MANAGER_MODULE)],
  providers: [CacheManagerProvider],
  exports: [CacheManagerProvider],
})
export class CacheManagerProviderModule {}
