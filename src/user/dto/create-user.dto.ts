import { Role } from '../enum/role.enum';
import { ICreateUserDto } from '../interface/dto/create-user-dto.interface';

export class CreateUserDto implements ICreateUserDto {
  name: string;
  lastName: string;
  email: string;
  role?: Role;
}
