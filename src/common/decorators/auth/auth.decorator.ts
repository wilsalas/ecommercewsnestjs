import { Role } from '@/common/enums';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards';
import { RolesGuard } from '@/common/guards';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
};
