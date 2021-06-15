import { Field, InputType } from '@nestjs/graphql';
import { IUpdateEntityInputType } from 'src/shared/graphql/interface/input-types/update-entity-input-type.interface';
import { GetEntityByIdInputType } from 'src/shared/graphql/input-type/get-entity-by-id.input-type';
import { UpdateUserPayloadInput } from './update-user-payload.input-type';

@InputType()
export class UpdateUserInputType implements IUpdateEntityInputType {
  @Field()
  where: GetEntityByIdInputType;

  @Field()
  payload: UpdateUserPayloadInput;
}
