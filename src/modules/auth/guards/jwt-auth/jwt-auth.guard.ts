import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(error: any, user: any, info: any) {
    if (error || !user) {
      const message = error ? ` - reason: ${error.message}` : '';
      throw new UnauthorizedException(
        `You are not authorized to view this resource${message}`,
      );
    }
    return user;
  }
}
