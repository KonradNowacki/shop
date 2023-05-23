import {createParamDecorator, ExecutionContext, UnauthorizedException} from "@nestjs/common";

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException('Incorrect token claims')
    }

    return data ? user?.[data] : user;
  },
);
