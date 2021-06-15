import { Role } from 'src/user/enum/role.enum';
import { ICreateUserDto } from 'src/user/interface/dto/user/create-user-dto.interface';

export class CreateUserDto implements ICreateUserDto {
  name: string;
  lastName: string;
  email: string;
  role?: Role;
}
