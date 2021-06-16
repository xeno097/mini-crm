import { Role } from 'src/user/enum/role.enum';

export interface IUpdateUserPayloadInputType {
  name?: string;
  lastName?: string;
  role?: Role;
  blocked?: boolean;
}
