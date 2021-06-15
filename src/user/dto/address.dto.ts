import { IAddressDto } from '../interface/dto/address-dto.interface';

export class AddressDto implements IAddressDto {
  id: string;
  country: string;
  address: string;
  postalCode: string;
  info: string;
}
