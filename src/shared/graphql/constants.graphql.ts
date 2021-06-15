import { ArgsOptions, ID } from '@nestjs/graphql';
import { FilterInput } from './input-type/filter.input-type';

export const idFieldOptions: ArgsOptions = { type: () => ID };

export const filterInputOptions: ArgsOptions = {
  nullable: true,
  defaultValue: new FilterInput(),
};
