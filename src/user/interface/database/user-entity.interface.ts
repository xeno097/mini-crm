import { Role } from 'src/user/enum/role.enum';

export interface IUserEntity {
  name: string;
  lastName: string;
  email: string;
  role: Role;
  blocked: boolean;
}
