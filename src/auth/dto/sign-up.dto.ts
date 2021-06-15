import { Role } from 'src/user/enum/role.enum';
import { ISignUpDto } from '../interface/dto/sign-up-dto.interface';

export class SignUpDto implements ISignUpDto {
  email: string;
  password: string;
  name: string;
  lastName: string;
  role?: Role;
}
