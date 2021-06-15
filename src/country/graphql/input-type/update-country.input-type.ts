import { Field, InputType } from '@nestjs/graphql';
import { GetEntityByIdInputType } from 'src/shared/graphql/input-type/get-entity-by-id.input-type';
import { IUpdateEntityInputType } from 'src/shared/graphql/interface/input-types/update-entity-input-type.interface';
import { UpdateCountryPayloadInputType } from './update-country-payload.input-type';

@InputType()
export class UpdateCountryInputType implements IUpdateEntityInputType {
  @Field()
  where: GetEntityByIdInputType;

  @Field()
  payload: UpdateCountryPayloadInputType;
}
