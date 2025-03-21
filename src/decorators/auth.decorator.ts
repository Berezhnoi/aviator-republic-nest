import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

export function Auth(roles: string[], useDBUser = true) {
  return applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('useDBUser', useDBUser),
    UseGuards(AuthGuard),
  );
}
