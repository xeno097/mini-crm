import { Role } from '../../enum/role.enum';
import { IUserDto } from '../../interface/dto/user/user-dto.interface';
import { AddressDto } from '../address/address.dto';

export class UserDto implements IUserDto {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  blocked: boolean;
  addresses: AddressDto[];
}
