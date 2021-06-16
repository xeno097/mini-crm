import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IAddressType } from 'src/user/interface/object-type/address-object-type.interface';

const AddressTypeName = 'Address';

@ObjectType(AddressTypeName)
export class AddressType implements IAddressType {
  @Field(() => ID)
  id: string;

  @Field()
  country: string;

  @Field()
  address: string;

  @Field()
  postalCode: string;

  @Field({ nullable: true })
  info: string;
}
