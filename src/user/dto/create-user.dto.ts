import { Role } from '../enum/role.enum';
import { ICreateUserDto } from '../interface/dto/user/create-user-dto.interface';

export class CreateUserDto implements ICreateUserDto {
  name: string;
  lastName: string;
  email: string;
  role?: Role;
}
