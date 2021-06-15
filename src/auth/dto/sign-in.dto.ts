import { Role } from 'src/user/enum/role.enum';
import { ISignInDto } from '../interface/dto/sign-in-dto.interface';

export class SignInDto implements ISignInDto {
  email: string;
  password: string;
  name: string;
  lastName: string;
  role?: Role;
}
