import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ICountryType } from 'src/country/interface/object-type/country-object-type.interface';

const CountryTypeName = 'Country';

@ObjectType(CountryTypeName)
export class CountryType implements ICountryType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;
}
