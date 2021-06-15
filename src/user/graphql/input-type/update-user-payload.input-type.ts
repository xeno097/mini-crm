import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/user/enum/role.enum';
import { IUpdateUserPayloadInput } from 'src/user/interface/input-type/update-user-payload-input-type.interface';

@InputType()
export class UpdateUserPayloadInput implements IUpdateUserPayloadInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field({ nullable: true })
  blocked?: boolean;
}
