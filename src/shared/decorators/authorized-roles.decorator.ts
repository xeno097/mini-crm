import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/enum/role.enum';

export const AUTHORIZED_ROLES_KEY = 'AUTHORIZED_ROLES';

export const AuthorizedRoles = (...authorizedRoles: Role[]) =>
  SetMetadata(AUTHORIZED_ROLES_KEY, authorizedRoles);
