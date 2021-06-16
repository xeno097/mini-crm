import { ArgsOptions, ID } from '@nestjs/graphql';
import { FilterInputType } from './input-type/filter.input-type';

export const idFieldOptions: ArgsOptions = { type: () => ID };

export const filterInputOptions: ArgsOptions = {
  nullable: true,
  defaultValue: new FilterInputType(),
};
