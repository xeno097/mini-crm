import { Field, InputType } from '@nestjs/graphql';
import { IUpdateEntityInputType } from 'src/shared/graphql/interface/input-types/update-entity-input-type.interface';
import { GetEntityByIdInputType } from 'src/shared/graphql/input-type/get-entity-by-id.input-type';
import { UpdateUserPayloadInputType } from './update-user-payload.input-type';

const UpdateUserInputTypeName = 'UpdateUserInput';

@InputType(UpdateUserInputTypeName)
export class UpdateUserInputType implements IUpdateEntityInputType {
  @Field()
  where: GetEntityByIdInputType;

  @Field()
  payload: UpdateUserPayloadInputType;
}
