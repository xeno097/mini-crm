import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/user/enum/role.enum';
import { IUpdateUserPayloadInputType } from 'src/user/interface/input-type/user/update-user-payload-input-type.interface';

const UpdateUserPayloadInputName = 'UpdateUserPayloadInput';

@InputType(UpdateUserPayloadInputName)
export class UpdateUserPayloadInputType implements IUpdateUserPayloadInputType {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field({ nullable: true })
  blocked?: boolean;
}
