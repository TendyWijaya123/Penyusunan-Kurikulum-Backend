import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../constants/role.constant';

export const Roles = (...roles: (keyof typeof ROLES)[]) =>
  SetMetadata('roles', roles);