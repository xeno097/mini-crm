import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';
import { IAddressObject } from '../interface/database/address-object.interface';

export class AddressObject implements IBaseEntity, IAddressObject {
  id: string;
  country: string;
  address: string;
  postalCode: string;
  info: string;
}
