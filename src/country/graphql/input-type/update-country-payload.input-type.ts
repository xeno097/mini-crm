import { Field, InputType } from '@nestjs/graphql';
import { IUpdateCountryPayloadInputType } from 'src/country/interface/input-type/update-country-input-type.interface';

@InputType()
export class UpdateCountryPayloadInputType
  implements IUpdateCountryPayloadInputType {
  @Field()
  name: string;
}
