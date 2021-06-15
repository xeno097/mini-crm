import { AddressObject } from '../database/address.object';
import { Role } from '../enum/role.enum';
import { IUserDto } from '../interface/dto/user-dto.interface';

export class UserDto implements IUserDto {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  blocked: boolean;
  addresses: AddressObject[];
}
