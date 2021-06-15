import { Role } from 'src/user/enum/role.enum';
import { IAddressObject } from '../database/address-object.interface';

export interface IUpdateUserPayloadDto {
  name?: string;
  lastName?: string;
  role?: Role;
  blocked?: boolean;
  addresses?: IAddressObject[];
}
