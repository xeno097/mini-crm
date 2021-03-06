import { IUpdateAddressPayloadDto } from 'src/user/interface/dto/address/update-address-payload-dto.interface';

export class UpdateAddressPayload implements IUpdateAddressPayloadDto {
  country?: string;
  address?: string;
  postalCode?: string;
  info?: string;
}
