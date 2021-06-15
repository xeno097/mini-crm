import { IUserDto } from 'src/user/interface/dto/user-dto.interface';

export interface IAuthResultDto {
  jwt: string;
  user: IUserDto;
}
