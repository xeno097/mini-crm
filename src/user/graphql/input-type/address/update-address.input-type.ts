import { Field, InputType } from '@nestjs/graphql';
import { GetEntityByIdInputType } from 'src/shared/graphql/input-type/get-entity-by-id.input-type';
import { IUpdateEntityInputType } from 'src/shared/graphql/interface/input-types/update-entity-input-type.interface';
import { UpdateAddressPayloadInputType } from './update-address-payload.input-type';

@InputType()
export class UpdateAddressInputType implements IUpdateEntityInputType {
  @Field()
  where: GetEntityByIdInputType;

  @Field()
  payload: UpdateAddressPayloadInputType;
}
