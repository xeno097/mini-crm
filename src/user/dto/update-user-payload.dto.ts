import { AddressObject } from '../database/address.object';
import { Role } from '../enum/role.enum';
import { IUpdateUserPayloadDto } from '../interface/dto/update-user-dto.interface';

export class UpdateUserPayloadDto implements IUpdateUserPayloadDto {
  blocked?: boolean;
  lastName?: string;
  name?: string;
  role?: Role;
  addresses?: AddressObject[];
}
