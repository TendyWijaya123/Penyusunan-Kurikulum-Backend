import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Jika data spesifik diminta, kembalikan atribut tertentu
    return data ? user?.[data] : user;
  },
);
