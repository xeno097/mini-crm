import { Field, InputType } from '@nestjs/graphql';
import { IUpdateUserPasswordInputType } from 'src/auth/interface/input-type/update-user-password-input-type.interface';

@InputType()
export class UpdateUserPasswordInputType
  implements IUpdateUserPasswordInputType {
  @Field()
  oldPassword: string;

  @Field()
  password: string;
}
