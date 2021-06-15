import { Role } from 'src/user/enum/role.enum';

export interface IUpdateUserPayloadDto {
  name?: string;
  lastName?: string;
  role?: Role;
  blocked?: boolean;
}
