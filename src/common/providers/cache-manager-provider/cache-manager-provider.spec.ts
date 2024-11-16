import { Test, TestingModule } from '@nestjs/testing';
import { CacheManagerProvider } from './cache-manager-provider';

describe('CacheManagerProvider', () => {
  let provider: CacheManagerProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheManagerProvider],
    }).compile();

    provider = module.get<CacheManagerProvider>(CacheManagerProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
