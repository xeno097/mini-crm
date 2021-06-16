import { Field, InputType, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { IFilterInputType } from '../interface/input-types/filter-input-type.interface';

const FilterInputTypeName = 'FilterInput';

@InputType(FilterInputTypeName)
export class FilterInputType implements IFilterInputType {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  start?: number = 0;

  @Field(() => Int, { nullable: true, defaultValue: 50 })
  limit?: number = 50;

  @Field(() => GraphQLJSON, { nullable: true })
  filter?: Record<string, any>;
}
