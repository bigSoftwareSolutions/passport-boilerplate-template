import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  //TODO read more about reflector
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    console.log('JwtAuthGuard: isPublic', !!isPublic);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  //TODO HANDLE REQUEST TO TRHOW CUSTOM ERROR
}
