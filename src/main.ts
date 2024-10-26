import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodeEnv } from './common/enums';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import initSwagger from './app.swagger';

async function bootstrap() {
  const env = process.env;
  const nodeEnv = env.NODE_ENV;
  const port = env.PORT ?? 3000;
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('json', { limit: '50mb' });
  app.enableCors({ origin: true });

  if (nodeEnv !== NodeEnv.PRODUCTION) initSwagger(app);
  await app.listen(port);
  logger.log(`Server is running in ${await app.getUrl()}`);
}

bootstrap();
