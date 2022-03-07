/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    //what is the required roles
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    //data user get from login
    // const {user}=context.switchToHttp().getRequest()

    const user: User = {
      name: 'beni',
      roles: [Role.ADMIN],
    };

    //does the current user have the required roles
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
