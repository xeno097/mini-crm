import { ICreateAddressDto } from '../interface/dto/create-address-dto.interface';

export class CreateAddressDto implements ICreateAddressDto {
  country: string;
  address: string;
  postalCode: string;
  info?: string;
}
