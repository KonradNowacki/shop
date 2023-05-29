import {SetMetadata} from "@nestjs/common";
import {RolesEnum} from "@shop/common-utils";

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
