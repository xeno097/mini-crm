import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/user/enum/role.enum';
import { ICreateUserInputType } from 'src/user/interface/input-type/user/create-user-input-type.interface';

const CreateUserInputTypeName = 'CreateUserInput';

@InputType(CreateUserInputTypeName)
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
