import { Field, InputType } from '@nestjs/graphql';
import { CreateCustomerCareInputType } from 'src/auth/interface/input-type/create-customer-care-input-type.interface';

@InputType()
export class CreateCustomerCare implements CreateCustomerCareInputType {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  lastName: string;
}
