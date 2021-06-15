import { IUpdateAddressPayloadDto } from '../interface/dto/update-address-payload-dto.interface';

export class UpdateAddressPayload implements IUpdateAddressPayloadDto {
  country?: string;
  address?: string;
  postalCode?: string;
  info?: string;
}
