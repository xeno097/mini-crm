import { Role } from 'src/user/enum/role.enum';
import { IAddressDto } from '../address/address-dto.interface';

export interface IUserDto {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  blocked: boolean;
  addresses: IAddressDto[];
}
