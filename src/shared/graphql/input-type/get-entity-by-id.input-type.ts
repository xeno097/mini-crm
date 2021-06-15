import { Field, ID, InputType } from '@nestjs/graphql';
import { IGetEntityByIdInputType } from '../interface/input-types/get-entity-by-id-input-type.interface';

@InputType()
export class GetEntityByIdInputType implements IGetEntityByIdInputType {
  @Field(() => ID)
  id: string;
}
