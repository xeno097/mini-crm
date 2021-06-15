import { IUpdateAuthPayloadDto } from '../interface/dto/update-auth-payload-dto.interface';

export class UpdateAuthPayloadDto implements IUpdateAuthPayloadDto {
  password: string;
  oldPassword: string;
}
