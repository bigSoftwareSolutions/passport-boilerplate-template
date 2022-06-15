import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    //TODO change for cache
    user.permissions = await this.userService.getUserPermissions(user.username);
    console.log('PermissionsGuard: user from request', user);

    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    console.log(
      'PermissionsGuard: permissions from endpoint',
      requiredPermissions,
    );

    if (!requiredPermissions) {
      return true;
    }

    if (!user.permissions) {
      return false;
    }

    return this.matchPermissions(requiredPermissions, user.permissions);
  }

  matchPermissions(
    requiredPermissions: string[],
    userPermissions: string[],
  ): boolean {
    let checker = (arr: any[], target: any[]) =>
      target.every((v) => arr.includes(v));

    return checker(userPermissions, requiredPermissions);
  }
}
