import { Field, ID, InputType } from '@nestjs/graphql';
import { ICreateAddressInputType } from 'src/user/interface/input-type/address/create-address-input-type.interface';

@InputType()
export class CreateAddressInputType implements ICreateAddressInputType {
  @Field(() => ID)
  country: string;

  @Field()
  address: string;

  @Field()
  postalCode: string;

  @Field({ nullable: true })
  info?: string;
}
