import { Role } from 'src/user/enum/role.enum';

export interface IUserDto {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  blocked: boolean;
}
