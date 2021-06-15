import { IUserType } from 'src/user/interface/object-type/user-object-type.interface';

export interface IAuthResultType {
  jwt: string;
  user: IUserType;
}
