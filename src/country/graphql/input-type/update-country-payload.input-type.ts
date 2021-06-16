import { Field, InputType } from '@nestjs/graphql';
import { IUpdateCountryPayloadInputType } from 'src/country/interface/input-type/update-country-input-type.interface';

const UpdateCountryPayloadInputTypeName = 'UpdateCountryPayloadInput';

@InputType(UpdateCountryPayloadInputTypeName)
export class UpdateCountryPayloadInputType
  implements IUpdateCountryPayloadInputType {
  @Field()
  name: string;
}
