import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const CONFIG_MODULE: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: ['.env', '.env.test', '.env.development', '.env.production'],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    PORT: Joi.number().default(5000),
  }),
};
