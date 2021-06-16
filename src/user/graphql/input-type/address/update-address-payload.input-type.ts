import { Field, ID, InputType } from '@nestjs/graphql';
import { IUpdateAddressPayloadInputType } from 'src/user/interface/input-type/address/update-address-payload-input-type.interface';

const UpdateAddressPayloadInputTypeName = 'UpdateAddressPayloadInput';

@InputType(UpdateAddressPayloadInputTypeName)
export class UpdateAddressPayloadInputType
  implements IUpdateAddressPayloadInputType {
  @Field(() => ID, { nullable: true })
  country?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  postalCode?: string;

  @Field({ nullable: true })
  info?: string;
}
