import { Role } from 'src/user/enum/role.enum';

export interface ICreateUserInputType {
  name: string;
  lastName: string;
  email: string;
  role?: Role;
}
