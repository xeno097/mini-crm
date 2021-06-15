import { Role } from 'src/user/enum/role.enum';

export interface IUpdateUserPayloadInput {
  name?: string;
  lastName?: string;
  role?: Role;
  blocked?: boolean;
}
