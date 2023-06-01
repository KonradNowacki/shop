import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {RolesEnum} from "@shop/common-utils";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RolesEnum[]>('roles', context.getHandler());


    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = request.user?.roles?.map(({ role }) => role);

    if (!userRoles) {
      // TODO KN Handle error
    }

    return this.matchRoles(userRoles, roles);
  }

  private matchRoles(userRoles: RolesEnum[], requiredRoles: RolesEnum[]): boolean {

    for (const role of requiredRoles) {
      if (userRoles.includes(role)) {
        return true;
      }
    }

    return false;

  }

}

