import { IAuthModuleOptions } from '@nestjs/passport';

export const PASSPORT_MODULE: IAuthModuleOptions = {
  defaultStrategy: 'jwt',
};
