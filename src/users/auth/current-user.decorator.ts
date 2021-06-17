
import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp().getRequest()
    console.log('DECORATOR', ctx.user)
    return ctx.user;
  },
);