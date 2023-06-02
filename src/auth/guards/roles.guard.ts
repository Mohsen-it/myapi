import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.enum';
import { User } from '../models/user.class';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector ){}
 
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const requiredRole=this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
      context.getHandler(),
      context.getClass()
    ])
    if(!requiredRole){
      return true;
    }
 const {user}:{user:User}=context.switchToHttp().getRequest();

    return requiredRole.some((role)=>user.role?.includes(role));
  }
}
