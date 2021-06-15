import { Field, InputType } from '@nestjs/graphql';
import { ISignUpInputType } from 'src/auth/interface/input-type/sign-up-input-type.interface';

@InputType()
export class SignUpInputType implements ISignUpInputType {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  lastName: string;
}
