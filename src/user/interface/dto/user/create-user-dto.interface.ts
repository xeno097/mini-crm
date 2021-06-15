import { Role } from 'src/user/enum/role.enum';

export interface ICreateUserDto {
  name: string;
  lastName: string;
  email: string;
  role?: Role;
}
