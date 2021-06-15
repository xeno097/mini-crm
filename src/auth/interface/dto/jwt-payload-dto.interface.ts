import { Role } from 'src/user/enum/role.enum';

export interface IJwtPayloadDto {
  id: string;
  email: string;
  role: Role;
}
