import { IUpdateEntityDto } from 'src/shared/interfaces/update-entity-dto.interface';
import { UpdateAddressPayload } from './update-address-payload.dto';

export class UpdateAddressDto implements IUpdateEntityDto {
  getOneEntityDto: Record<string, any>;
  updateEntityPayload: UpdateAddressPayload;
}
