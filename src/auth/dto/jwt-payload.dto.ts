import { IJwtPayloadDto } from '../interface/dto/jwt-payload-dto.interface';

export class JwtPayloadDto implements IJwtPayloadDto {
  id: string;
  email: string;
}
