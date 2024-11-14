import { Role } from '@/common/enums';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards';
import { RolesGuard } from '@/common/guards';

export const Auth = (...roles: Role[]) => {
  const assignedRoles = roles.length ? roles : Object.values(Role);
  return applyDecorators(
    Roles(...assignedRoles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
};
