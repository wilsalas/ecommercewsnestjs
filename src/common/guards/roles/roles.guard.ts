import { ROLES_KEY } from '@/common/decorators';
import { Role } from '@/common/enums';
import { IRequestUser } from '@/common/interfaces';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest() as {
      user: IRequestUser;
    };
    const allowed = requiredRoles.some((role) => user.role?.includes(role));
    if (!allowed) {
      throw new UnauthorizedException(
        `The user role is not allowed to view this resource.`,
      );
    }
    return allowed;
  }
}
