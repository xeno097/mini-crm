import { Role } from 'src/user/enum/role.enum';
import { IAddressObject } from '../database/address-object.interface';

export interface IUserDto {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  blocked: boolean;
  addresses: IAddressObject[];
}
