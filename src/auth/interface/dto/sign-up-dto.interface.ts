import { Role } from 'src/user/enum/role.enum';

export interface ISignUpDto {
  email: string;
  password: string;
  name: string;
  lastName: string;
  role?: Role;
}
