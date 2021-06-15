import { IGetAuthByIdDto } from '../interface/dto/get-auth-by-id-dto.interface';

export class GetAuthByEmailDto implements IGetAuthByIdDto {
  email: string;
}
