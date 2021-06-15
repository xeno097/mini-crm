import { ISignInDto } from '../interface/dto/sign-in-dto.interface';

export class SignInDto implements ISignInDto {
  password: string;
  email: string;
}
