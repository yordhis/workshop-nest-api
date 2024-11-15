import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRoles } from 'src/users/types/Roles';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
constructor(
  private readonly reflector: Reflector
){}

  canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
   
    if (isPublic) {
      return true;
    }


    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()  
    
    return requiredRoles.some( (role) => user.roles?.includes(role) )
  }
}
