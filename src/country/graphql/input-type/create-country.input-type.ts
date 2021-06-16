import { Field, InputType } from '@nestjs/graphql';
import { ICreateCountryInputType } from 'src/country/interface/input-type/create-country-input-type.interface';

const CreateCountryInputTypeName = 'CreateCountryInput';

@InputType(CreateCountryInputTypeName)
export class CreateCountryInputType implements ICreateCountryInputType {
  @Field()
  name: string;
}
