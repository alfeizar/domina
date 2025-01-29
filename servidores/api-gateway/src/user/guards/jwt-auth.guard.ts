import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const canActivate = super.canActivate(context);

    if (!canActivate) {
      return false;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new BadRequestException({
        ok: false,
        data: '',
        message: 'Usuario no encontrado',
      });
    }

    return true;
  }
}
