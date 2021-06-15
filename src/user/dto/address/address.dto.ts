import { IAddressDto } from 'src/user/interface/dto/address/address-dto.interface';

export class AddressDto implements IAddressDto {
  id: string;
  country: string;
  address: string;
  postalCode: string;
  info: string;
}
