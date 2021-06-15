import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/user/enum/role.enum';
import { ICreateUserInputType } from 'src/user/interface/input-type/create-user-input-type.interface';

@InputType()
export class CreateUserInputType implements ICreateUserInputType {
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => Role, { nullable: true })
  role?: Role;
}
