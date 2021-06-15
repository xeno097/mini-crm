import { IUserDto } from 'src/user/interface/dto/user/user-dto.interface';

export interface IAuthResultDto {
  jwt: string;
  user: IUserDto;
}
