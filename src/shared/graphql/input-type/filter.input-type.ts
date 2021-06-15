import { Field, InputType, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { IFilterInput } from '../interface/input-types/filter-input-type.interface';

@InputType()
export class FilterInput implements IFilterInput {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  start?: number = 0;

  @Field(() => Int, { nullable: true, defaultValue: 50 })
  limit?: number = 50;

  @Field(() => GraphQLJSON, { nullable: true })
  filter?: Record<string, any>;
}
