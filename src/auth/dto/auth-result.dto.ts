import { UserDto } from 'src/user/dto/user.dto';
import { IAuthResultDto } from '../interface/dto/auth-result-dto.interface';

export class AuthResultDto implements IAuthResultDto {
  jwt: string;
  user: UserDto;
}
