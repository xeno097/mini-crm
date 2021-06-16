import { Field, InputType } from '@nestjs/graphql';
import { ICreateCustomerCareInputType } from 'src/auth/interface/input-type/create-customer-care-input-type.interface';

const CreateCustomerCareInputTypeName = 'CreateCustomerCareInput';

@InputType(CreateCustomerCareInputTypeName)
export class CreateCustomerCareInputType
  implements ICreateCustomerCareInputType {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  lastName: string;
}
