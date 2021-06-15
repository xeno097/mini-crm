import { Field, InputType } from '@nestjs/graphql';
import { ISignInInputType } from 'src/auth/interface/input-type/sign-in-input-type.interface';

@InputType()
export class SignInInputType implements ISignInInputType {
  @Field()
  password: string;

  @Field()
  email: string;
}
